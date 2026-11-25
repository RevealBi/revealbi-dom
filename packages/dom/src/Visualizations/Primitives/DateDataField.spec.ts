import { describe, expect, it } from "vitest";
import { DataSource, DateAggregationType, DateDataField, DateField, DateFormatting, NumberField, PivotVisualization, RdashDocument, RestDataSourceItem } from "../../index";

const pivotWithDateRow = (formatting?: DateFormatting) => {
    const item = new RestDataSourceItem("Orders", "https://example.com/orders.json", new DataSource("REST"));
    item.fields = [new DateField("OrderedOn"), new NumberField("Amount")];
    const day = new DateDataField("OrderedOn");
    day.aggregationType = DateAggregationType.Day;
    day.formatting = formatting;
    const document = new RdashDocument("Pivot");
    document.visualizations = [new PivotVisualization("Pivot", item).setRow(day).setValue("Amount")];
    return document;
};

const dateRow = (document: RdashDocument): any => (document.toJson() as any).Widgets[0].VisualizationDataSpec.Rows[0].SummarizationField;

describe("date data field formatting", () => {
    it("leaves the date formatting out by default", () => {
        expect(dateRow(pivotWithDateRow())).not.toHaveProperty("DateFormatting");
    });

    it("keeps a custom date format and locale through load and save", () => {
        const formatting = new DateFormatting("yyyy/MM/dd");
        formatting.overrideDefaultSettings = true;
        formatting.locale = "de-DE";
        const document = pivotWithDateRow(formatting);
        const loaded = RdashDocument.loadFromJson(document.toJsonString());
        const row = (loaded.visualizations[0] as PivotVisualization).rows[0].dataField as DateDataField;
        expect(row.formatting).toBeInstanceOf(DateFormatting);
        expect(dateRow(document).DateFormatting).toEqual({ _type: "DateFormattingSpecType", OverrideDefaultSettings: true, Locale: "de-DE", DateFormat: "yyyy/MM/dd" });
        expect(dateRow(loaded)).toEqual(dateRow(document));
    });
});
