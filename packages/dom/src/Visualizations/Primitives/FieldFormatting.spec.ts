import { describe, expect, it } from "vitest";
import { DateField, DateFormatting, DateTimeField, JsonConvert, RdashDocument, TimeField } from "../../index";
import { fieldsConverter } from "../../Core/Serialization/Converters/FieldsConverter";

const wire = (value: object): any => JsonConvert.serializeObject(value);
const load = (json: any): any => JsonConvert.deserializeObject<any>(json, fieldsConverter(json));
const dateFieldTypes = [["Date", DateField], ["DateTime", DateTimeField], ["Time", TimeField]] as const;

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

describe("date field formatting", () => {
    it.each(dateFieldTypes)("leaves the format of %s fields out by default", (_, Type) => {
        const field: any = new Type("OrderedOn");
        expect(field.formatting).toBeUndefined();
        expect(wire(field)).not.toHaveProperty("Formatting");
    });

    it.each(dateFieldTypes)("writes and loads a custom date format on %s fields", (_, Type) => {
        const field: any = new Type("OrderedOn");
        field.formatting = new DateFormatting("dd-MMM-yyyy");
        const json = wire(field);
        expect(json.Formatting).toEqual({ _type: "DateFormattingSpecType", OverrideDefaultSettings: false, DateFormat: "dd-MMM-yyyy" });
        const loaded = load(json);
        expect(loaded).toBeInstanceOf(Type);
        expect(loaded.formatting).toBeInstanceOf(DateFormatting);
        expect(loaded.formatting.dateFormat).toBe("dd-MMM-yyyy");
        expect(wire(loaded)).toEqual(json);
    });
});

describe("editor-made fields", () => {
    it("keep custom date formats through load and save", () => {
        const fields = [
            { FieldName: "Amount", FieldType: "Number", IsCalculated: false },
            { FieldName: "OrderedOn", FieldType: "Date", IsCalculated: false, Formatting: { _type: "DateFormattingSpecType", OverrideDefaultSettings: true, Locale: "de-DE", DateFormat: "dd-MMM-yyyy" } },
            { FieldName: "ShippedAt", FieldType: "DateTime", IsCalculated: false, Formatting: { _type: "DateFormattingSpecType", OverrideDefaultSettings: true, DateFormat: "yyyy-MM-dd HH:mm" } },
            { FieldName: "OpensAt", FieldType: "Time", IsCalculated: false, Formatting: { _type: "DateFormattingSpecType", OverrideDefaultSettings: true, DateFormat: "HH:mm" } }
        ];
        const saved: any = RdashDocument.loadFromJson(JSON.stringify(dashboard(fields))).toJson();
        expect(saved.Widgets[0].DataSpec.Fields).toMatchObject(fields);
    });

    it("keep number formats and locales through load and save", () => {
        const fields = [{ FieldName: "Amount", FieldType: "Number", IsCalculated: false, Formatting: { _type: "NumberFormattingSpecType", OverrideDefaultSettings: true, Locale: "de-DE", FormatType: "Currency", DecimalDigits: 2, ShowGroupingSeparator: true, CurrencySymbol: "€" } }];
        const saved: any = RdashDocument.loadFromJson(JSON.stringify(dashboard(fields))).toJson();
        expect(saved.Widgets[0].DataSpec.Fields).toMatchObject(fields);
    });

    it("keep formats of transposed fields through load and save", () => {
        const fields = [
            { FieldName: "Amount", FieldType: "Number", IsCalculated: false },
            { FieldName: "OrderedOn", FieldType: "Date", IsCalculated: false, Formatting: { _type: "DateFormattingSpecType", OverrideDefaultSettings: true, Locale: "de-DE", DateFormat: "dd-MMM-yyyy" } }
        ];
        const json: any = dashboard(fields);
        json.Widgets[0].DataSpec.TransposedFields = fields;
        const saved: any = RdashDocument.loadFromJson(JSON.stringify(json)).toJson();
        expect(saved.Widgets[0].DataSpec.TransposedFields).toMatchObject(fields);
    });

    it("keep formats when imported into another document", () => {
        const fields = [
            { FieldName: "Amount", FieldType: "Number", IsCalculated: false },
            { FieldName: "OrderedOn", FieldType: "Date", IsCalculated: false, Formatting: { _type: "DateFormattingSpecType", OverrideDefaultSettings: true, Locale: "de-DE", DateFormat: "dd-MMM-yyyy" } }
        ];
        const target = new RdashDocument("Target");
        target.import(RdashDocument.loadFromJson(JSON.stringify(dashboard(fields))));
        const saved: any = target.toJson();
        expect(saved.Widgets[0].DataSpec.Fields).toMatchObject(fields);
    });
});
