import { describe, expect, it } from "vitest";
import { DataSourceItem, GridVisualization, NumberField, RdashDocument, TextField } from "../../index";

describe("FieldBase", () => {
    it("keeps a field's sort order through a round trip", () => {
        // Reveal sorts a grid by DataSpec.Fields[].Sorting, which the DOM dropped on load and save (#58).
        const data = new DataSourceItem("Sales");
        data.fields = [new TextField("Country"), new NumberField("Revenue")];
        const document = new RdashDocument("Sales");
        document.visualizations.push(new GridVisualization("Grid", data).setColumns("Country", "Revenue"));
        const json: any = document.toJson();
        json.Widgets[0].DataSpec.Fields[1].Sorting = "Desc";

        const saved: any = RdashDocument.loadFromJson(JSON.stringify(json)).toJson();

        expect(saved.Widgets[0].DataSpec.Fields.map((field: any) => field.Sorting)).toEqual(["None", "Desc"]);
    });
});
