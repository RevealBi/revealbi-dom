import { describe, expect, it } from "vitest";
import { GridVisualization, JsonConvert, RdashDocument, TabularColumn } from "../../index";

const wire = (value: object): any => JsonConvert.serializeObject(value);

const dashboard = (fields: object[], columns: object[]) => ({
    Title: "Columns", FormatVersion: 9, ThemeName: "rvDashboardAuroraTheme", UseAutoLayout: false,
    DataSources: [{ _type: "DataSourceType", Id: "sql", Provider: "SQLSERVER", Description: "SQL", Subtitle: "", Properties: {} }],
    Widgets: [{
        _type: "WidgetType", Id: "grid", Title: "Grid", RowSpan: 10, ColumnSpan: 10, IsTitleVisible: true,
        DataSpec: {
            _type: "TabularDataSpecType", IsTransposed: false, Expiration: 1440, Bindings: { Bindings: [] }, Fields: fields,
            DataSourceItem: { _type: "DataSourceItemType", Id: "orders", Title: "Orders", DataSourceId: "sql", HasTabularData: true, HasAsset: false, Properties: { Table: "Orders" }, Parameters: {} }
        },
        VisualizationDataSpec: { _type: "GridVisualizationDataSpecType", Columns: columns },
        VisualizationSettings: { _type: "GridVisualizationSettingsType", VisualizationType: "GRID" }
    }]
});

describe("grid column visibility", () => {
    it("creates visible columns", () => {
        const column = new TabularColumn("Amount");
        expect(column.isHidden).toBe(false);
        expect(wire(column).IsHidden).toBe(false);
    });

    it("writes and loads hidden columns", () => {
        const column = new TabularColumn("Amount");
        column.isHidden = true;
        const json = wire(column);
        expect(json).toMatchObject({ _type: "TabularColumnSpecType", FieldName: "Amount", IsHidden: true });
        expect(JsonConvert.deserializeObject(json, TabularColumn).isHidden).toBe(true);
    });

    it("keeps a column the editor hid through load and save", () => {
        const fields = [
            { FieldName: "Amount", FieldType: "Number", IsCalculated: false },
            { FieldName: "Name", FieldType: "String", IsCalculated: false }
        ];
        const columns = [
            { _type: "TabularColumnSpecType", Axis: { Title: "" }, FieldName: "Amount", IsHidden: false },
            { _type: "TabularColumnSpecType", Axis: { Title: "" }, FieldName: "Name", IsHidden: true }
        ];
        const document = RdashDocument.loadFromJson(JSON.stringify(dashboard(fields, columns)));
        expect((document.visualizations[0] as GridVisualization).columns.map(column => column.isHidden)).toEqual([false, true]);
        const saved: any = document.toJson();
        expect(saved.Widgets[0].VisualizationDataSpec.Columns).toMatchObject(columns);
    });
});
