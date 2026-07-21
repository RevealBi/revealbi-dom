import { describe, expect, it } from "vitest";
import { JsonConvert } from "../../Core/Serialization/JsonConvert";
import { GridVisualizationSettings } from "./GridVisualizationSettings";
import { PivotVisualizationSettings } from "./PivotVisualizationSettings";
import { SortingType } from "../Enums/SortingType";
import { GridColumnSummaryOperand } from "../Enums/GridColumnSummaryOperand";

/**
 * Regression tests for #3793 — grid column sort/group/summary state was lost on a
 * load -> serialize round-trip because `SortedColumns`, `GroupedColumns`, and
 * `SummarizedColumns` had no mapped property on `GridVisualizationSettingsBase`,
 * so `JsonConvert` silently dropped them.
 */
describe("GridVisualizationSettingsBase column-state round-trip", () => {
    const raw = {
        _type: "GridVisualizationSettingsType",
        SortedColumns: [
            { ColumnName: "City", SortDirection: "Desc" },
            { ColumnName: "Population", SortDirection: "Asc" }
        ],
        GroupedColumns: [
            { ColumnName: "Country", SortDirection: "Asc" }
        ],
        SummarizedColumns: [
            { ColumnName: "Population", Operand: "Sum" },
            { ColumnName: "City", Operand: "Count" }
        ]
    };

    it("hydrates sortedColumns from JSON on GridVisualizationSettings", () => {
        const settings = JsonConvert.deserializeObject(raw, GridVisualizationSettings);

        expect(settings.sortedColumns).toBeDefined();
        expect(settings.sortedColumns).toHaveLength(2);
        expect(settings.sortedColumns![0].columnName).toBe("City");
        expect(settings.sortedColumns![0].sortDirection).toBe(SortingType.Desc);
        expect(settings.sortedColumns![1].columnName).toBe("Population");
        expect(settings.sortedColumns![1].sortDirection).toBe(SortingType.Asc);
    });

    it("hydrates groupedColumns from JSON on GridVisualizationSettings", () => {
        const settings = JsonConvert.deserializeObject(raw, GridVisualizationSettings);

        expect(settings.groupedColumns).toHaveLength(1);
        expect(settings.groupedColumns![0].columnName).toBe("Country");
        expect(settings.groupedColumns![0].sortDirection).toBe(SortingType.Asc);
    });

    it("hydrates summarizedColumns from JSON on GridVisualizationSettings", () => {
        const settings = JsonConvert.deserializeObject(raw, GridVisualizationSettings);

        expect(settings.summarizedColumns).toHaveLength(2);
        expect(settings.summarizedColumns![0].columnName).toBe("Population");
        expect(settings.summarizedColumns![0].operand).toBe(GridColumnSummaryOperand.Sum);
        expect(settings.summarizedColumns![1].columnName).toBe("City");
        expect(settings.summarizedColumns![1].operand).toBe(GridColumnSummaryOperand.Count);
    });

    it("preserves all column collections through a round-trip (Grid)", () => {
        const settings = JsonConvert.deserializeObject(raw, GridVisualizationSettings);
        const output = JsonConvert.serializeObject(settings);

        expect(output["SortedColumns"]).toEqual(raw.SortedColumns);
        expect(output["GroupedColumns"]).toEqual(raw.GroupedColumns);
        expect(output["SummarizedColumns"]).toEqual(raw.SummarizedColumns);
    });

    it("preserves all column collections through a round-trip on PivotVisualizationSettings (shared base)", () => {
        const pivotRaw = { ...raw, _type: "PivotVisualizationSettingsType" };
        const settings = JsonConvert.deserializeObject(pivotRaw, PivotVisualizationSettings);

        expect(settings.sortedColumns).toHaveLength(2);
        expect(settings.groupedColumns).toHaveLength(1);
        expect(settings.summarizedColumns).toHaveLength(2);

        const output = JsonConvert.serializeObject(settings);
        expect(output["SortedColumns"]).toEqual(raw.SortedColumns);
        expect(output["GroupedColumns"]).toEqual(raw.GroupedColumns);
        expect(output["SummarizedColumns"]).toEqual(raw.SummarizedColumns);
    });

    it("does not emit column-state nodes when none are present", () => {
        const settings = JsonConvert.deserializeObject({ _type: "GridVisualizationSettingsType" }, GridVisualizationSettings);
        const output = JsonConvert.serializeObject(settings);

        expect(output["SortedColumns"]).toBeUndefined();
        expect(output["GroupedColumns"]).toBeUndefined();
        expect(output["SummarizedColumns"]).toBeUndefined();
    });
});
