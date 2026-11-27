import { describe, expect, it } from "vitest";
import {
    DashboardDataFilter,
    DashboardDateFilter,
    DashboardFilter,
    DashboardXmlaFilter,
    JsonConvert,
    MicrosoftAnalysisServicesDataSource,
    MicrosoftAnalysisServicesDataSourceItem,
    RdashDocument
} from "../index";

const wire = (value: object): any => JsonConvert.serializeObject(value);

const filterTypes: Array<[string, new () => DashboardFilter]> = [
    ["DateGlobalFilterType", DashboardDateFilter],
    ["TabularGlobalFilterType", DashboardDataFilter],
    ["XmlaGlobalFilterType", DashboardXmlaFilter]
];

describe("dashboard filter visibility", () => {
    it.each(filterTypes)("creates visible %s filters", (_, Type) => {
        const filter = new Type();
        expect(filter.isHidden).toBe(false);
        expect(wire(filter).IsHidden).toBe(false);
    });

    it.each(filterTypes)("writes and loads hidden %s filters", (typeName, Type) => {
        const filter = new Type();
        filter.isHidden = true;
        const json = wire(filter);
        expect(json).toMatchObject({ _type: typeName, IsHidden: true });
        expect(JsonConvert.deserializeObject(json, Type).isHidden).toBe(true);
    });

    it("keeps filters the editor hid through load and save", () => {
        const filters = [
            { _type: "DateGlobalFilterType", Id: "_date", Title: "Date Filter", IsHidden: false, RuleType: "AllTime", IncludeToday: true },
            { _type: "TabularGlobalFilterType", Id: "country", Title: "Country", IsHidden: true, SelectedFieldName: "Country", SelectedItems: [] },
            { _type: "XmlaGlobalFilterType", Id: "region", Title: "Region", IsHidden: true, HierarchyUniqueName: "[Geography].[Region]", SelectedItems: [] }
        ];
        const document = RdashDocument.loadFromJson(JSON.stringify({ Title: "Filters", FormatVersion: 9, GlobalFilters: filters }));
        expect(document.filters.map(filter => filter.isHidden)).toEqual([false, true, true]);
        const saved: any = document.toJson();
        expect(saved.GlobalFilters).toMatchObject(filters.map(({ _type, Id, IsHidden }) => ({ _type, Id, IsHidden })));
    });
});

describe("Analysis Services dashboard filter data source item", () => {
    // The cube the filter lists its members from, as the Reveal editor writes it (#92)
    const cube = {
        _type: "DataSourceItemType",
        Id: "ashttpItemId",
        Title: "Analysis Services HTTP DSItem",
        DataSourceId: "ashttpId",
        HasTabularData: false,
        Properties: { Catalog: "Adventure Works DW 2008R2", Cube: "Adventure Works" }
    };

    it("keeps the filter's data source item through load and save", () => {
        const filter = { _type: "XmlaGlobalFilterType", Id: "calendar", Title: "Date.Calendar", SelectedItems: [], DataSourceItem: cube, DimensionUniqueName: "[Date]", HierarchyUniqueName: "[Date].[Calendar]" };

        const saved: any = RdashDocument.loadFromJson(JSON.stringify({ Title: "Filters", FormatVersion: 9, GlobalFilters: [filter] })).toJson();

        expect(saved.GlobalFilters[0].DataSourceItem).toMatchObject(cube);
    });

    it("writes the data source item a filter is created with", () => {
        const item = new MicrosoftAnalysisServicesDataSourceItem("Adventure Works", new MicrosoftAnalysisServicesDataSource());
        item.catalog = "Adventure Works DW 2008R2";
        item.cube = "Adventure Works";

        const json = wire(new DashboardXmlaFilter(item));

        expect(json.DataSourceItem).toMatchObject({ Title: "Adventure Works", Properties: { Catalog: "Adventure Works DW 2008R2", Cube: "Adventure Works" } });
        expect(json).not.toHaveProperty("SataSourceItem");
    });
});
