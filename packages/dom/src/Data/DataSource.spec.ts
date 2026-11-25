import { describe, expect, it } from "vitest";
import { DataSource, DataSourceItem, GridVisualization, JsonConvert, MicrosoftSqlServerDataSourceItem, NumberField, RdashDocument, RestDataSourceItem } from "../index";

const wire = (value: object): any => JsonConvert.serializeObject(value);

const dashboard = () => ({
    Title: "Refresh", FormatVersion: 9, ThemeName: "rvDashboardAuroraTheme", UseAutoLayout: false,
    DataSources: [{ _type: "DataSourceType", Id: "sql", Provider: "SQLSERVER", Description: "SQL", Subtitle: "", Properties: { Host: "db", Database: "Sales" }, Settings: { DefaultRefreshRate: 120 } }],
    Widgets: [{
        _type: "WidgetType", Id: "grid", Title: "Grid", RowSpan: 10, ColumnSpan: 10, IsTitleVisible: true,
        DataSpec: {
            _type: "TabularDataSpecType", IsTransposed: false, Expiration: 1440, Bindings: { Bindings: [] },
            DataSourceItem: { _type: "DataSourceItemType", Id: "orders", Title: "Orders", DataSourceId: "sql", HasTabularData: true, HasAsset: false, Properties: { Table: "Orders" }, Settings: { DefaultRefreshRate: 60 }, Parameters: {} },
            Fields: [{ FieldName: "Amount", FieldType: "Number", IsCalculated: false }]
        },
        VisualizationDataSpec: { _type: "GridVisualizationDataSpecType", Columns: [{ _type: "TabularColumnSpecType", FieldName: "Amount" }] },
        VisualizationSettings: { _type: "GridVisualizationSettingsType", VisualizationType: "GRID" }
    }]
});

describe("data source settings", () => {
    it("leaves Settings out by default", () => {
        const dataSource = new DataSource("SQL");
        expect(dataSource.defaultRefreshRate).toBeUndefined();
        expect(wire(dataSource)).not.toHaveProperty("Settings");
    });

    it("adds no Settings to the copies of a data source without any", () => {
        const dataSource = new DataSource("Orders");
        expect(wire(new MicrosoftSqlServerDataSourceItem("Orders", "Orders", dataSource).dataSource!)).not.toHaveProperty("Settings");
        expect(wire(new RestDataSourceItem("Orders API", "https://example.com/orders.json", dataSource).resourceItemDataSource!)).not.toHaveProperty("Settings");
        const item = new DataSourceItem("Orders", dataSource);
        item.fields = [new NumberField("Amount")];
        const document = new RdashDocument("Orders");
        document.visualizations.push(new GridVisualization("First", item).setColumns("Amount"), new GridVisualization("Second", item).setColumns("Amount"));
        const saved: any = document.toJson();
        const copies = document.dataSources.filter(copy => copy.id === dataSource.id && copy !== dataSource);
        expect(copies.length).toBeGreaterThan(0);
        expect(saved.DataSources.filter((json: any) => "Settings" in json)).toEqual([]);
    });

    it("writes the default refresh rate to Settings, where Reveal reads it", () => {
        const dataSource = new DataSource("SQL");
        dataSource.defaultRefreshRate = 120;
        const json = wire(dataSource);
        expect(json.Settings).toEqual({ DefaultRefreshRate: 120 });
        expect(json.Properties).not.toHaveProperty("DefaultRefreshRate");
    });

    it("keeps the other settings when the default refresh rate changes", () => {
        const json = { _type: "DataSourceType", Id: "sql", Provider: "SQLSERVER", Description: "SQL", Subtitle: "", Properties: {}, Settings: { DefaultRefreshRate: 120, Custom: "kept" } };
        const dataSource = JsonConvert.deserializeObject(json, DataSource);
        dataSource.defaultRefreshRate = 60;
        expect(wire(dataSource).Settings).toEqual({ DefaultRefreshRate: 60, Custom: "kept" });
        expect(json.Settings).toEqual({ DefaultRefreshRate: 120, Custom: "kept" });
    });

    it("removes the default refresh rate when it is cleared", () => {
        const dataSource = new DataSource("SQL");
        dataSource.defaultRefreshRate = 120;
        dataSource.defaultRefreshRate = undefined;
        expect(wire(dataSource)).not.toHaveProperty("Settings");
        dataSource.settings = { DefaultRefreshRate: 120, Custom: "kept" };
        dataSource.defaultRefreshRate = undefined;
        expect(wire(dataSource).Settings).toEqual({ Custom: "kept" });
    });

    it("does not share settings with the data source copies made on save", () => {
        const dataSource = new DataSource("Orders");
        dataSource.defaultRefreshRate = 120;
        const item = new DataSourceItem("Orders", dataSource);
        item.fields = [new NumberField("Amount")];
        const document = new RdashDocument("Orders");
        document.visualizations.push(new GridVisualization("First", item).setColumns("Amount"), new GridVisualization("Second", item).setColumns("Amount"));
        document.toJson();
        const copies = document.dataSources.filter(saved => saved.id === dataSource.id && saved !== dataSource);
        expect(copies.length).toBeGreaterThan(0);
        copies.forEach(copy => {
            expect(copy.defaultRefreshRate).toBe(120);
            expect(copy.settings).not.toBe(dataSource.settings);
        });
    });

    it("loads the default refresh rate and every other setting", () => {
        const json = { _type: "DataSourceType", Id: "sql", Provider: "SQLSERVER", Description: "SQL", Subtitle: "", Properties: {}, Settings: { DefaultRefreshRate: 120, Custom: "kept" } };
        const dataSource = JsonConvert.deserializeObject(json, DataSource);
        expect(dataSource.defaultRefreshRate).toBe(120);
        expect(wire(dataSource)).toEqual(json);
    });

    it("keeps the refresh rate when a typed item replaces a loaded data source", () => {
        const loaded = JsonConvert.deserializeObject({ _type: "DataSourceType", Id: "sql", Provider: "SQLSERVER", Description: "SQL", Properties: {}, Settings: { DefaultRefreshRate: 120 } }, DataSource);
        const item = new MicrosoftSqlServerDataSourceItem("Orders", "Orders", loaded);
        expect(item.dataSource).not.toBe(loaded);
        expect(item.dataSource?.settings).not.toBe(loaded.settings);
        expect(item.dataSource?.defaultRefreshRate).toBe(120);
        expect(wire(item.dataSource!).Settings).toEqual({ DefaultRefreshRate: 120 });
    });

    it("keeps the refresh rate of the data source given to a REST item", () => {
        const dataSource = new DataSource("Orders API");
        dataSource.defaultRefreshRate = 120;
        const item = new RestDataSourceItem("Orders", "https://example.com/orders.json", dataSource);
        item.fields = [new NumberField("Amount")];
        const document = new RdashDocument("Orders");
        document.visualizations.push(new GridVisualization("Orders", item).setColumns("Amount"));
        const saved: any = document.toJson();
        expect(saved.DataSources.find((json: any) => json.Id === dataSource.id).Settings).toEqual({ DefaultRefreshRate: 120 });
        expect(item.resourceItemDataSource?.settings).not.toBe(dataSource.settings);
    });
});

describe("data source item settings", () => {
    it("leaves Settings out by default", () => {
        expect(wire(new DataSourceItem("Orders"))).not.toHaveProperty("Settings");
    });

    it("loads and writes Settings", () => {
        const json = { _type: "DataSourceItemType", Id: "orders", Title: "Orders", DataSourceId: "sql", HasTabularData: true, HasAsset: false, Properties: { Table: "Orders" }, Settings: { DefaultRefreshRate: 60 }, Parameters: {} };
        expect(wire(JsonConvert.deserializeObject(json, DataSourceItem))).toEqual(json);
    });
});

describe("editor-made data sources", () => {
    it("keep data source and item settings through load and save", () => {
        const saved: any = RdashDocument.loadFromJson(JSON.stringify(dashboard())).toJson();
        expect(saved.DataSources[0].Settings).toEqual({ DefaultRefreshRate: 120 });
        expect(saved.Widgets[0].DataSpec.DataSourceItem.Settings).toEqual({ DefaultRefreshRate: 60 });
    });

    it("keep data source and item settings when imported into another document", () => {
        const target = new RdashDocument("Target");
        target.import(RdashDocument.loadFromJson(JSON.stringify(dashboard())));
        const saved: any = target.toJson();
        expect(saved.DataSources[0].Settings).toEqual({ DefaultRefreshRate: 120 });
        expect(saved.Widgets[0].DataSpec.DataSourceItem.Settings).toEqual({ DefaultRefreshRate: 60 });
    });
});
