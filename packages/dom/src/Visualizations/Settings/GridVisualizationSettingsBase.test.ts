import { describe, expect, it } from "vitest";
import { JsonConvert } from "../../Core/Serialization/JsonConvert";
import { GridVisualizationSettings } from "./GridVisualizationSettings";
import { PivotVisualizationSettings } from "./PivotVisualizationSettings";
import { SortingType } from "../Enums/SortingType";

/**
 * Regression tests for #3793 — grid column sorting was lost on a
 * load -> serialize round-trip because `SortedColumns` had no mapped
 * property on `GridVisualizationSettingsBase`, so `JsonConvert` dropped it.
 */
describe("GridVisualizationSettingsBase SortedColumns round-trip", () => {
    const raw = {
        _type: "GridVisualizationSettingsType",
        SortedColumns: [
            { ColumnName: "City", SortDirection: "Desc" },
            { ColumnName: "Population", SortDirection: "Asc" }
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

    it("preserves SortedColumns through a deserialize -> serialize round-trip (Grid)", () => {
        const settings = JsonConvert.deserializeObject(raw, GridVisualizationSettings);
        const output = JsonConvert.serializeObject(settings);

        expect(output["SortedColumns"]).toEqual([
            { ColumnName: "City", SortDirection: "Desc" },
            { ColumnName: "Population", SortDirection: "Asc" }
        ]);
    });

    it("preserves SortedColumns through a round-trip on PivotVisualizationSettings (shared base)", () => {
        const pivotRaw = { ...raw, _type: "PivotVisualizationSettingsType" };
        const settings = JsonConvert.deserializeObject(pivotRaw, PivotVisualizationSettings);

        expect(settings.sortedColumns).toHaveLength(2);
        expect(settings.sortedColumns![0].columnName).toBe("City");
        expect(settings.sortedColumns![0].sortDirection).toBe(SortingType.Desc);

        const output = JsonConvert.serializeObject(settings);
        expect(output["SortedColumns"]).toEqual([
            { ColumnName: "City", SortDirection: "Desc" },
            { ColumnName: "Population", SortDirection: "Asc" }
        ]);
    });

    it("does not emit a SortedColumns node when none is present", () => {
        const settings = JsonConvert.deserializeObject({ _type: "GridVisualizationSettingsType" }, GridVisualizationSettings);
        const output = JsonConvert.serializeObject(settings);

        expect(output["SortedColumns"]).toBeUndefined();
    });
});
