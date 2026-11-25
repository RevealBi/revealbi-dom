import { describe, expect, it } from "vitest";
import { DashboardDataFilter, DashboardDateFilter, DashboardFilter, DashboardXmlaFilter, JsonConvert, RdashDocument } from "../index";

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
