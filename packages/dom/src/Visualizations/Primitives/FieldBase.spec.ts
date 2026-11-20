import { describe, expect, it } from "vitest";
import { DateField, DateTimeField, JsonConvert, NumberField, RdashDocument, TextField, TimeField } from "../../index";
import { fieldsConverter } from "../../Core/Serialization/Converters/FieldsConverter";

const wire = (value: object): any => JsonConvert.serializeObject(value);
const load = (json: any): any => JsonConvert.deserializeObject<any>(json, fieldsConverter(json));
const fieldTypes = [["String", TextField], ["Number", NumberField], ["Date", DateField], ["DateTime", DateTimeField], ["Time", TimeField]] as const;

const dashboard = (fields: object[]) => ({
    Title: "Fields", FormatVersion: 9, ThemeName: "rvDashboardAuroraTheme", UseAutoLayout: false,
    DataSources: [{ _type: "DataSourceType", Id: "sql", Provider: "SQLSERVER", Description: "SQL", Subtitle: "", Properties: {} }],
    Widgets: [{
        _type: "WidgetType", Id: "grid", Title: "Grid", RowSpan: 10, ColumnSpan: 10, IsTitleVisible: true,
        DataSpec: {
            _type: "TabularDataSpecType", IsTransposed: false, Expiration: 1440, Bindings: { Bindings: [] }, Fields: fields,
            DataSourceItem: { _type: "DataSourceItemType", Id: "orders", Title: "Orders", DataSourceId: "sql", HasTabularData: true, HasAsset: false, Properties: { Table: "Orders" }, Parameters: {} }
        },
        VisualizationDataSpec: { _type: "GridVisualizationDataSpecType", Columns: [{ _type: "TabularColumnSpecType", FieldName: "Amount" }] },
        VisualizationSettings: { _type: "GridVisualizationSettingsType", VisualizationType: "GRID" }
    }]
});

describe("field visibility", () => {
    it.each(fieldTypes)("creates visible %s fields", (_, Type) => {
        const field: any = new Type("Amount");
        expect(field.isHidden).toBe(false);
        expect(wire(field).IsHidden).toBe(false);
    });

    it.each(fieldTypes)("writes and loads hidden %s fields", (fieldType, Type) => {
        const field: any = new Type("Amount");
        field.isHidden = true;
        const json = wire(field);
        expect(json).toMatchObject({ FieldName: "Amount", FieldType: fieldType, IsHidden: true });
        expect(load(json).isHidden).toBe(true);
    });
});

describe("editor-made fields", () => {
    it("keep hidden fields through load and save", () => {
        const fields = [
            { FieldName: "Region", FieldType: "String", IsHidden: true, IsCalculated: false },
            { FieldName: "Amount", FieldType: "Number", IsHidden: false, IsCalculated: false },
            { FieldName: "OrderedOn", FieldType: "Date", IsHidden: true, IsCalculated: false },
            { FieldName: "ShippedAt", FieldType: "DateTime", IsHidden: true, IsCalculated: false },
            { FieldName: "OpensAt", FieldType: "Time", IsHidden: true, IsCalculated: false }
        ];
        const saved: any = RdashDocument.loadFromJson(JSON.stringify(dashboard(fields))).toJson();
        expect(saved.Widgets[0].DataSpec.Fields).toMatchObject(fields);
    });
});
