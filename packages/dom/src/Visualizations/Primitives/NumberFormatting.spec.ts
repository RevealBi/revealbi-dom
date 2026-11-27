import { describe, expect, it } from "vitest";
import { BarChartVisualization, DataSourceItem, JsonConvert, LargeNumberFormat, NumberField, NumberFormatting, RdashDocument, TextField } from "../../index";

function dashboardWithValueFormatting(formatting: object): string {
    const data = new DataSourceItem("Data");
    data.fields = [new TextField("Category"), new NumberField("Sales")];
    const document = new RdashDocument("Formats");
    document.visualizations = [new BarChartVisualization("Chart", data).setLabel("Category").setValue("Sales")];
    const json: any = document.toJson();
    json.Widgets[0].VisualizationDataSpec.Values[0].SummarizationField.Formatting = formatting;
    return JSON.stringify(json);
}

const roundTrip = (formatting: object): any => {
    const saved: any = RdashDocument.loadFromJson(dashboardWithValueFormatting(formatting)).toJson();
    return saved.Widgets[0].VisualizationDataSpec.Values[0].SummarizationField.Formatting;
};

const legacy = { _type: "NumberFormattingSpecType", OverrideDefaultSettings: true, FormatType: "Number", DecimalDigits: 0 };

describe("large number format", () => {
    it("reads the old ApplyMkFormat key as Auto when MKFormat is missing", () => {
        const formatting = roundTrip({ ...legacy, ApplyMkFormat: true });
        expect(formatting.MKFormat).toBe("Auto");
        expect(formatting).not.toHaveProperty("ApplyMkFormat");
    });

    it("reads ApplyMkFormat false as None", () => {
        expect(roundTrip({ ...legacy, ApplyMkFormat: false }).MKFormat).toBe("None");
    });

    it("prefers MKFormat over ApplyMkFormat, as Reveal does", () => {
        expect(roundTrip({ ...legacy, MKFormat: "None", ApplyMkFormat: true }).MKFormat).toBe("None");
        expect(roundTrip({ ...legacy, MKFormat: "K", ApplyMkFormat: true }).MKFormat).toBe("K");
    });

    it.each(Object.entries(LargeNumberFormat))("writes %s with the spelling Reveal reads", (name, value) => {
        const formatting = new NumberFormatting();
        formatting.largeNumberFormat = value;
        const json = JsonConvert.serializeObject(formatting);
        expect(json.MKFormat).toBe(name);
        expect(JsonConvert.deserializeObject(json, NumberFormatting).largeNumberFormat).toBe(value);
    });
});
