import { describe, expect, it } from "vitest";
import { RdashDocument } from "../../index";

const formatting = { _type: "NumberFormattingSpecType", OverrideDefaultSettings: true, FormatType: "Currency", DecimalDigits: 2, ShowGroupingSeparator: true, CurrencySymbol: "$" };

const dashboard = () => ({
    Title: "Xmla", FormatVersion: 9, ThemeName: "rvDashboardAuroraTheme", UseAutoLayout: false,
    DataSources: [{ _type: "DataSourceType", Id: "ssas", Provider: "ANALYSISSERVICES", Description: "SSAS", Properties: { Url: "http://server/olap/msmdpump.dll", Mode: "HTTP" }, Settings: {} }],
    Widgets: [{
        _type: "WidgetType", Id: "pivot", Title: "Pivot", RowSpan: 10, ColumnSpan: 10, IsTitleVisible: true,
        DataSpec: {
            _type: "XmlaDataSpecType", Expiration: 1440, Bindings: { Bindings: [] }, ShowGrandTotals: false, Rows: [], Columns: [], Measures: [], Filters: [], DataFilters: [],
            DataSourceItem: { _type: "DataSourceItemType", Id: "cube", Title: "Cube", DataSourceId: "ssas", HasTabularData: false, HasAsset: false, Properties: { Catalog: "Adventure Works DW", Cube: "Adventure Works" }, Settings: {}, Parameters: {} }
        },
        VisualizationDataSpec: {
            _type: "PivotVisualizationDataSpecType", FormatVersion: 1, Rows: [], Columns: [],
            Values: [{ _type: "MeasureColumnSpecType", XmlaMeasure: { IsHidden: false, UniqueName: "[Measures].[Sales Amount]", Caption: "Sales Amount", IsCalculated: false, Formatting: formatting, Sorting: "None" } }]
        },
        VisualizationSettings: { _type: "PivotVisualizationSettingsType", VisualizationType: "PIVOT" }
    }]
});

describe("XmlaMeasure", () => {
    it("keeps the number format of an Analysis Services measure through load and save", () => {
        const saved: any = RdashDocument.loadFromJson(JSON.stringify(dashboard())).toJson();
        expect(saved.Widgets[0].VisualizationDataSpec.Values[0].XmlaMeasure.Formatting).toMatchObject(formatting);
    });
});
