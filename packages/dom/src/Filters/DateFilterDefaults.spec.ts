import { describe, expect, it } from "vitest";
import { DashboardDateFilter, DateTimeFilter, XmlaDateFilter, DateFilterRule, PeriodType,
    JsonConvert, RdashDocument } from "../index";
import { CloneUtility } from "../Core/Utilities/CloneUtility";

type DateFilter = DashboardDateFilter | DateTimeFilter | XmlaDateFilter;
const types: Array<new (rule?: DateFilterRule) => DateFilter> = [DashboardDateFilter, DateTimeFilter, XmlaDateFilter];
const names = ["DateGlobalFilterType", "DateTimeFilterType", "XmlaDateFilterType"];
const wire = (filter: DateFilter): any => JsonConvert.serializeObject(filter);

describe("default date filter rules", () => {
    for (const [index, Type] of types.entries()) {
        describe(names[index], () => {
            it.each(["omitted", "undefined"])("defaults %s to AllTime and preserves it through roundtrips and copies", option => {
                const filter = option === "omitted" ? new Type() : new Type(undefined);
                const actual = wire(filter);
                const expected = wire(new Type(DateFilterRule.allTime));
                if (filter instanceof DashboardDateFilter) {
                    expect(filter.id).toMatch(/^[0-9a-f-]{36}$/i);
                    expected.Id = actual.Id;
                }
                expect(actual).toEqual(expected);
                expect(actual.RuleType).toBe("AllTime");
                expect(wire(JsonConvert.deserializeObject(actual, Type))).toEqual(actual);
                expect(wire(CloneUtility.clone(filter))).toEqual(actual);
                for (const Target of types)
                    expect(wire(new Target(filter.rule)).RuleType).toBe("AllTime");
            });
            it("honors explicit rules and rejects null constructors and null/undefined mutations", () => {
                expect(Type.prototype).not.toHaveProperty("setRule");
                const filter = new Type(DateFilterRule.next(7, PeriodType.Day, true));
                expect(wire(filter).CustomRule).toMatchObject({ Relation: "Next", IncludeToday: true });
                expect(() => new Type(null as unknown as DateFilterRule)).toThrow(TypeError);
                const before = wire(filter);
                for (const invalid of [null, undefined]) {
                    expect(() => { filter.rule = invalid as unknown as DateFilterRule; }).toThrow(TypeError);
                    expect(wire(filter)).toEqual(before);
                }
            });
            it("uses dashboard defaults for omitted fields and retains saved field modes", () => {
                const loaded = JsonConvert.deserializeObject({ _type: names[index] }, Type);
                const saved = wire(loaded);
                expect(saved.RuleType).toBe("AllTime");
                expect(saved.IncludeToday).toBe(true);
                if (index === 0) expect(saved.Id).toMatch(/^[0-9a-f-]{36}$/i);
                else expect(saved.FilterType).toBe("AllValues");
                expect(wire(JsonConvert.deserializeObject(saved, Type))).toEqual(saved);
                expect(wire(CloneUtility.clone(loaded))).toEqual(saved);
            });
        });
    }
    it("defaults title-only dashboard filters and retains explicit titled rules", () => {
        const filter = new DashboardDateFilter("Orders");
        expect(filter.title).toBe("Orders");
        expect(wire(filter).RuleType).toBe("AllTime");
        expect(wire(new DashboardDateFilter("Orders", undefined)).RuleType).toBe("AllTime");
        const explicit = new DashboardDateFilter("Orders", DateFilterRule.last(7, PeriodType.Day, false));
        expect(explicit.title).toBe("Orders");
        expect(wire(explicit).CustomRule).toMatchObject({ Relation: "Last", IncludeToday: false });
        expect(() => new DashboardDateFilter("Orders", null as unknown as DateFilterRule)).toThrow(TypeError);
    });
    it.each([DateTimeFilter, XmlaDateFilter])("preserves saved selections and field modes for %s", Type => {
        for (const mode of ["AllValues", "SelectedValues", "FilterByRule"]) {
            const json = { RuleType: "LastMonth", IncludeToday: false, FilterType: mode, SelectedValues: [] };
            const loaded = JsonConvert.deserializeObject<DateTimeFilter | XmlaDateFilter>(json, Type);
            expect(wire(loaded)).toMatchObject(json);
            expect(wire(CloneUtility.clone(loaded))).toEqual(wire(loaded));
        }
    });
    it.each([6, 8])("preserves new defaults and existing selections in format %s dashboards", version => {
        const document = RdashDocument.loadFromJson(JSON.stringify({ FormatVersion: version, GlobalFilters: [
            { _type: "DateGlobalFilterType", Id: "existing", RuleType: "LastMonth", IncludeToday: false },
            { _type: "DateGlobalFilterType" }
        ] }));
        document.filters.push(new DashboardDateFilter(), new DashboardDateFilter("Orders"));
        const saved: any = document.toJson();
        expect(saved.GlobalFilters[0]).toMatchObject({ RuleType: "LastMonth", IncludeToday: false });
        expect(saved.GlobalFilters[1].RuleType).toBe("AllTime");
        expect(saved.GlobalFilters[2].RuleType).toBe("AllTime");
        expect(saved.GlobalFilters[3]).toMatchObject({ RuleType: "AllTime", Title: "Orders" });
        expect(RdashDocument.loadFromJson(JSON.stringify(saved)).toJson()).toEqual(saved);
    });
});
