import { describe, expect, it } from "vitest";
import { AggregationType, ColumnChartVisualization, DataSource, DataSourceItem, DateField, DateFormatting, GridVisualization, IVisualization, MicrosoftAnalysisServicesDataSource, MicrosoftAnalysisServicesDataSourceItem, NumberDataField, NumberField, PivotVisualization, RdashDocument, TextField } from "../../index";
import { TabularDataDefinition } from "../../Visualizations/DataDefinitions/TabularDataDefinition";

const dataSource = new DataSource("Orders");

const loadedChart = (hiddenFieldNames: string[]) => {
    const data = new DataSourceItem("Orders", dataSource);
    data.fields = [new TextField("Region"), new NumberField("Sales"), new TextField("Notes")];
    const document = new RdashDocument("Orders");
    document.visualizations.push(new ColumnChartVisualization("Sales", data).setLabel("Region").setValue("Sales"));
    const json: any = document.toJson();
    for (const field of json.Widgets[0].DataSpec.Fields) {
        field.IsHidden = hiddenFieldNames.includes(field.FieldName);
    }
    return RdashDocument.loadFromJson(JSON.stringify(json)).visualizations[0];
};

const visibility = (visualization: IVisualization | null): any => {
    const document = new RdashDocument("Visibility");
    document.dataSources = [dataSource];
    document.visualizations.push(visualization!);
    const json: any = document.toJson();
    return {
        fields: json.Widgets[0].DataSpec.Fields.map((field: any) => [field.FieldName, field.IsHidden]),
        columns: json.Widgets[0].VisualizationDataSpec.Columns?.map((column: any) => [column.FieldName, column.IsHidden])
    };
};

describe("grid conversion of hidden fields", () => {
    it("keeps the fields hidden in the source hidden and shows their columns", () => {
        const grid = GridVisualization.from(loadedChart(["Region", "Notes"]));
        expect(visibility(grid)).toEqual({
            fields: [["Region", true], ["Sales", false], ["Notes", true]],
            columns: [["Region", false], ["Sales", false]]
        });
    });

    it("shows the columns of hidden fields when the grid includes all fields", () => {
        const grid = GridVisualization.from(loadedChart(["Region", "Notes"]), { includeAllFields: true });
        expect(visibility(grid)).toEqual({
            fields: [["Region", true], ["Sales", false], ["Notes", true]],
            columns: [["Region", false], ["Sales", false], ["Notes", false]]
        });
    });

    it("keeps the fields hidden in the source hidden when the data source item already has fields", () => {
        const chart = loadedChart(["Region", "Notes"]);
        chart.dataDefinition.dataSourceItem!.fields = [new TextField("Region"), new NumberField("Sales"), new TextField("Notes")];
        const grid = GridVisualization.from(chart);
        expect(visibility(grid)).toEqual({
            fields: [["Region", true], ["Sales", false], ["Notes", true]],
            columns: [["Region", false], ["Sales", false]]
        });
        expect(chart.dataDefinition.dataSourceItem!.fields.map(field => field.isHidden)).toEqual([false, false, false]);
    });

    it("hides the columns of values hidden in the chart", () => {
        const data = new DataSourceItem("Orders", dataSource);
        data.fields = [new TextField("Region"), new NumberField("Sales"), new NumberField("Cost")];
        const cost = new NumberDataField("Cost");
        cost.isHidden = true;
        const chart = new ColumnChartVisualization("Sales", data).setLabel("Region").setValues(new NumberDataField("Sales"), cost);
        expect(visibility(GridVisualization.from(chart)).columns).toEqual([["Region", false], ["Sales", false], ["Cost", true]]);
    });

    it.each([["hidden first", [true, false]], ["visible first", [false, true]]])("shows the column of a field the chart shows in another value (%s)", (_, hidden) => {
        const data = new DataSourceItem("Orders", dataSource);
        data.fields = [new TextField("Region"), new NumberField("Sales")];
        const values = hidden.map(isHidden => {
            const value = new NumberDataField("Sales");
            value.isHidden = isHidden;
            return value;
        });
        values[1].aggregationType = AggregationType.Avg;
        const chart = new ColumnChartVisualization("Sales", data).setLabel("Region").setValues(...values);
        expect(visibility(GridVisualization.from(chart)).columns).toEqual([["Region", false], ["Sales", false]]);
    });

    it("keeps the source's field formats when the data source item already has fields", () => {
        const data = new DataSourceItem("Orders", dataSource);
        data.fields = [new DateField("Date"), new NumberField("Sales")];
        const chart = new ColumnChartVisualization("Sales", data).setLabel("Date").setValue("Sales");
        const date = (chart.dataDefinition as TabularDataDefinition).fields[0] as DateField;
        date.formatting = new DateFormatting("dd-MMM-yyyy");
        date.formatting.locale = "de-DE";
        const grid = GridVisualization.from(chart)!;
        const gridDate = (grid.dataDefinition as TabularDataDefinition).fields[0] as DateField;
        expect(gridDate.formatting).not.toBe(date.formatting);
        expect(gridDate.formatting).toMatchObject({ dateFormat: "dd-MMM-yyyy", locale: "de-DE" });
        expect((data.fields[0] as DateField).formatting).toBeUndefined();
    });

    it("leaves the item's fields the source lacks or types differently alone", () => {
        const data = new DataSourceItem("Orders", dataSource);
        data.fields = [new TextField("Region"), new NumberField("Sales")];
        const chart = new ColumnChartVisualization("Sales", data).setLabel("Region").setValue("Sales");
        const region = new DateField("Region");
        region.formatting = new DateFormatting("dd-MMM-yyyy");
        (chart.dataDefinition as TabularDataDefinition).fields = [region];
        const grid = GridVisualization.from(chart)!;
        expect((grid.dataDefinition as TabularDataDefinition).fields).toEqual([new TextField("Region"), new NumberField("Sales")]);
    });

    it("converts cube visualizations, which have no fields to hide", () => {
        const item = new MicrosoftAnalysisServicesDataSourceItem("Sales cube", new MicrosoftAnalysisServicesDataSource("Cubes"));
        const grid = GridVisualization.from(new PivotVisualization("Sales", item).setRow("Region").setValue("Sales"));
        expect(grid?.columns.map(column => column.fieldName)).toEqual(["Region", "Sales"]);
    });

    it("leaves the source visualization's hidden fields alone", () => {
        const chart = loadedChart(["Region", "Notes"]);
        GridVisualization.from(chart, { includeAllFields: true });
        expect(visibility(chart).fields).toEqual([["Region", true], ["Sales", false], ["Notes", true]]);
    });
});
