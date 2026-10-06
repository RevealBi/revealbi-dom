import { describe, expect, it } from "vitest";
import * as api from "../index";
import { DashboardDateFilter, DateTimeFilter, XmlaDateFilter, DateFilterRule, PeriodType,
    JsonConvert, FilterType, RdashDocument, DashboardDateFilterBinding, DashboardDateFilterBindingTarget,
    DateLinkFilter, GridVisualization, DataSourceItem, DateTimeField, VisualizationLinker,
    ColumnChartVisualization, DateDataField, NumberField, DateTimeFieldSettings, TextVisualization, DateField } from "../index";
import { DateRuleType } from "./Enums/DateRuleType";
import { prepareModernDocument } from "../Core/Serialization/ModernDocumentWriter";

type DateFilter = DashboardDateFilter | DateTimeFilter | XmlaDateFilter;
const types: Array<new (rule: DateFilterRule) => DateFilter> = [DashboardDateFilter, DateTimeFilter, XmlaDateFilter];
const names = ["DateGlobalFilterType", "DateTimeFilterType", "XmlaDateFilterType"];
const wire = (filter: DateFilter): any => JsonConvert.serializeObject(filter);

describe("DateFilterRule parity", () => {
    for (const [index, Type] of types.entries()) {
        describe(names[index], () => {
            for (const legacy of Object.values(DateRuleType).filter(rule => rule !== DateRuleType.CustomRule)) {
                for (const includeToday of [false, true]) {
                    it(`round-trips and copies ${legacy}, includeToday=${includeToday}`, () => {
                        const json = { _type: names[index], RuleType: legacy, IncludeToday: includeToday,
                            ...(legacy === DateRuleType.CustomRange ? { CustomDateRange: {
                                From: { _type: "date", value: "2026-01-01T00:00:00.000Z" } } } : {}) };
                        const loaded = JsonConvert.deserializeObject(json, Type);
                        expect(wire(loaded)).toMatchObject(json);
                        for (const Target of types) {
                            const copied = new Target(loaded.rule);
                            expect(wire(copied)).toMatchObject({ RuleType: legacy, IncludeToday: includeToday });
                            expect(wire(copied).CustomDateRange).toEqual(json["CustomDateRange"]);
                        }
                    });
                }
            }
            for (const relation of ["All", "Last", "Next", "Previous", "This", "ToDate"]) {
                for (const period of Object.values(PeriodType)) {
                    for (const includeToday of [undefined, false, true]) {
                        it(`preserves ${relation}/${period}/${includeToday}`, () => {
                            const rule = { _type: "DateRuleType", Relation: relation, Count: 3, Period: period,
                                ...(includeToday === undefined ? {} : { IncludeToday: includeToday }) };
                            const loaded = JsonConvert.deserializeObject({ _type: names[index],
                                RuleType: "CustomRule", CustomRule: rule, IncludeToday: false }, Type);
                            expect(wire(loaded).CustomRule).toEqual(rule);
                            for (const Target of types)
                                expect(wire(new Target(loaded.rule))).toMatchObject({ CustomRule: rule, IncludeToday: false });
                        });
                    }
                }
            }
            it("builds relative selections, replaces state, and supports fluent assignment", () => {
                const filter = new Type(DateFilterRule.last(90, PeriodType.Day, false));
                expect(wire(filter)).toMatchObject({ RuleType: "CustomRule", CustomRule: {
                    _type: "DateRuleType", Relation: "Last", Count: 90, Period: "Day", IncludeToday: false } });
                expect(filter.setRule(DateFilterRule.custom(new Date("2026-01-01Z"), null))).toBe(filter);
                expect(wire(filter).CustomRule).toBeUndefined();
                filter.rule = DateFilterRule.next(7, PeriodType.Day);
                expect(wire(filter).CustomDateRange).toBeUndefined();
                expect(wire(filter).CustomRule).toEqual({ _type: "DateRuleType", Relation: "Next", Count: 7, Period: "Day" });
                filter.rule = DateFilterRule.allTime;
                expect(wire(filter).RuleType).toBe("AllTime");
                expect(wire(filter).CustomRule).toBeUndefined();
                expect(() => new Type(null as unknown as DateFilterRule)).toThrow();
            });
        });
    }

    it.each([
        [DateFilterRule.previous(2, PeriodType.Month), "Previous", 2, "Month", undefined],
        [DateFilterRule.this(PeriodType.Quarter), "This", 1, "Quarter", undefined],
        [DateFilterRule.toDate(PeriodType.Year, false), "ToDate", 1, "Year", false],
    ])("writes factory wire contracts", (rule, relation, count, period, includeToday) => {
        const result = wire(new DashboardDateFilter(rule as DateFilterRule)).CustomRule;
        expect(result).toMatchObject({ Relation: relation, Count: count, Period: period });
        expect(result.IncludeToday).toBe(includeToday);
    });
    it("validates factories and snapshots mutable Date inputs", () => {
        for (const count of [0, -1, 1.5, NaN, Infinity, 2147483648])
            expect(() => DateFilterRule.last(count, PeriodType.Day)).toThrow();
        expect(() => DateFilterRule.next(1, "invalid" as PeriodType)).toThrow();
        expect(() => DateFilterRule.custom(new Date("invalid"), null)).toThrow();
        expect(() => DateFilterRule.custom(new Date("2026-02-01Z"), new Date("2026-01-01Z"))).toThrow();
        const from = new Date("2026-01-01T00:00:00.000Z");
        const rule = DateFilterRule.custom(from, null);
        from.setFullYear(2030);
        expect(wire(new DashboardDateFilter(rule)).CustomDateRange.From.value).toBe("2026-01-01T00:00:00.000Z");
    });
    it.each([DateTimeFilter, XmlaDateFilter])("activates field filtering and clears selected values", Type => {
        const filter = JsonConvert.deserializeObject<DateTimeFilter | XmlaDateFilter>({ FilterType: "SelectedValues", SelectedValues: [], RuleType: "Today" }, Type);
        expect(filter.filterType).toBe(FilterType.SelectedValues);
        filter.rule = DateFilterRule.next(7, PeriodType.Day);
        expect(filter.filterType).toBe(FilterType.FilterByRule);
        expect(filter.selectedValues).toBeUndefined();
    });
    it("excludes legacy rule models from package exports", () => {
        expect(api).not.toHaveProperty("DateRuleType");
        expect(api).not.toHaveProperty("RelativePeriod");
    });
});

function dataSource(): DataSourceItem {
    const data = new DataSourceItem("Dates");
    data.fields = [new DateTimeField("OrderedOn"), new DateTimeField("ShippedOn"), new NumberField("Sales")];
    return data;
}

describe("modern date-filter identity", () => {
    it("creates independent GUIDs and format-8 documents without legacy creation defaults", () => {
        const first = new DashboardDateFilter(DateFilterRule.allTime);
        const second = new DashboardDateFilter("Delivery", DateFilterRule.allTime);
        expect(first.id).toMatch(/^[0-9a-f-]{36}$/i);
        expect(second.id).not.toBe(first.id);
        expect(first.id).not.toBe("_date");
        expect(new DashboardDateFilterBindingTarget().dashboardFilterId).toBeUndefined();
        expect(new RdashDocument().formatVersion).toBe(8);
    });
    it("keeps old JSON fallback IDs exclusively in readers", () => {
        expect(JsonConvert.deserializeObject({ RuleType: "Today" }, DashboardDateFilter).id).toBe("_date");
        expect(JsonConvert.deserializeObject({}, DashboardDateFilterBindingTarget).dashboardFilterId).toBe("_date");
        expect(JsonConvert.deserializeObject({}, DateLinkFilter).value).toBe("_date.Date Filter");
        expect(RdashDocument.loadFromJson("{}").formatVersion).toBe(6);
        const modern = JsonConvert.deserializeObject({ Id: "explicit", RuleType: "Today" }, DashboardDateFilter);
        expect(modern.id).toBe("explicit");
    });
    it("round-trips two actual binding IDs and a distinct target link ID", () => {
        const document = new RdashDocument("Source");
        const orders = new DashboardDateFilter("Order Date", DateFilterRule.last(7, PeriodType.Day));
        const shipping = new DashboardDateFilter("Ship Date", DateFilterRule.next(7, PeriodType.Day));
        const target = new DashboardDateFilter("Delivery Date", DateFilterRule.allTime);
        document.filters = [orders, shipping];
        const grid = new GridVisualization("Orders", dataSource())
            .connectDashboardFilter(orders, "OrderedOn").connectDashboardFilter(shipping, "ShippedOn");
        const dateLink = new DateLinkFilter(shipping, target);
        grid.linker = new VisualizationLinker().addDashboard("Details", "details", [dateLink]);
        document.visualizations.push(grid);
        const loaded = RdashDocument.loadFromJson(document.toJsonString());
        const json: any = loaded.toJson();
        expect(json.FormatVersion).toBe(8);
        expect(json.GlobalFilters.map((f: any) => f.Id)).toEqual([orders.id, shipping.id]);
        expect(json.Widgets[0].DataSpec.Bindings.Bindings.map((b: any) => b.Target.GlobalFilterId)).toEqual([orders.id, shipping.id]);
        expect(JsonConvert.serializeObject(dateLink)).toMatchObject({ Namespace: target.id, Value: `${shipping.id}.Ship Date` });
        expect(JSON.stringify(json)).toContain(`${shipping.id}.Ship Date`);
    });
    it("imports the bound date filter by ID, clones it, and deduplicates it", () => {
        const source = new RdashDocument();
        const unused = new DashboardDateFilter("Unused", DateFilterRule.allTime);
        const selected = new DashboardDateFilter("Selected", DateFilterRule.next(2, PeriodType.Month));
        source.filters = [unused, selected];
        const grid = new GridVisualization("Dates", dataSource()).connectDashboardFilter(selected, "OrderedOn");
        source.visualizations = [grid];
        source.validate();
        const target = new RdashDocument();
        target.import(source, grid, { includeDashboardFilters: true });
        target.import(source, grid, { includeDashboardFilters: true });
        expect(target.filters.map(f => f.id)).toEqual([selected.id]);
        expect(target.filters[0]).not.toBe(selected);
        expect((target.filters[0] as DashboardDateFilter).rule).toBeInstanceOf(DateFilterRule);
        expect((target.toJson() as any).Widgets[0].DataSpec.Bindings.Bindings[0].Target.GlobalFilterId).toBe(selected.id);
    });
    it("continues legacy edits/imports while preserving IDs", () => {
        const legacy = RdashDocument.loadFromJson('{"FormatVersion":6}');
        const filter = new DashboardDateFilter(DateFilterRule.allTime);
        legacy.filters.push(filter);
        legacy.visualizations.push(new GridVisualization("Dates", dataSource()).connectDashboardFilter(filter, "OrderedOn"));
        expect((legacy.toJson() as any).GlobalFilters[0].Id).toBe(filter.id);
        legacy.toJson();
        const target = new RdashDocument();
        target.import(legacy, undefined, { includeDashboardFilters: true });
        target.import(legacy, undefined, { includeDashboardFilters: true });
        expect(target.visualizations).toHaveLength(2);
        expect(target.filters.map(f => f.id)).toEqual([filter.id]);
        expect((target.toJson() as any).FormatVersion).toBe(8);
        expect(legacy.formatVersion).toBe(6);
    });
    it.each(["_date", "xFiltering_date", "explicit-id"])("loads and round-trips legacy selections for %s", id => {
        const json = { FormatVersion: 6, GlobalFilters: [{ _type: "DateGlobalFilterType", Id: id,
            RuleType: "Today", IncludeToday: false }] };
        const loaded = RdashDocument.loadFromJson(JSON.stringify(json));
        const saved: any = loaded.toJson();
        expect(saved.FormatVersion).toBe(6);
        expect(saved.GlobalFilters[0]).toMatchObject(json.GlobalFilters[0]);
        expect(wire(new DateTimeFilter((loaded.filters[0] as DashboardDateFilter).rule)))
            .toMatchObject({ RuleType: "Today", IncludeToday: false });
        expect(RdashDocument.loadFromJson(JSON.stringify(saved)).toJson()).toEqual(saved);
    });
    it("keeps legacy date-field wire values on load/save and best-effort import", () => {
        const original = new RdashDocument();
        const filter = JsonConvert.deserializeObject({ RuleType: "LastMonth", IncludeToday: false }, DashboardDateFilter);
        original.filters.push(filter);
        const data = dataSource();
        (data.fields[0] as DateTimeField).dataFilter = JsonConvert.deserializeObject({ RuleType: "Today", IncludeToday: false,
            DateFiscalYearStartMonth: 4, DisplayInLocalTimeZone: true }, DateTimeFilter);
        original.visualizations.push(new GridVisualization("Legacy", data).connectDashboardFilter(filter, "OrderedOn"));
        const oldWire: any = JsonConvert.serializeObject(original); oldWire.FormatVersion = 6;
        const loaded = RdashDocument.loadFromJson(JSON.stringify(oldWire));
        const saved: any = loaded.toJson();
        expect(saved.GlobalFilters[0]).toMatchObject({ Id: "_date", RuleType: "LastMonth", IncludeToday: false });
        expect(saved.Widgets[0].DataSpec.Fields[0].Filter).toMatchObject({ RuleType: "Today", IncludeToday: false,
            DateFiscalYearStartMonth: 4, DisplayInLocalTimeZone: true });
        const modern = new RdashDocument();
        modern.import(loaded, undefined, { includeDashboardFilters: true, includeVisualizationFilters: true });
        const result: any = modern.toJson();
        expect(result.FormatVersion).toBe(8);
        expect(result.GlobalFilters[0]).toMatchObject({ Id: "_date", RuleType: "LastMonth", IncludeToday: false });
        expect(result.Widgets[0].DataSpec.Fields[0].Filter).toMatchObject({ RuleType: "Today", IncludeToday: false });
        expect(result.Widgets[0].DataSpec.Fields[0].Settings).toMatchObject({ DateFiscalYearStartMonth: 4, DisplayInLocalTimeZone: true });
        expect(RdashDocument.loadFromJson(JSON.stringify(result)).visualizations).toHaveLength(1);
    });
    it("still rejects malformed JSON instead of returning an empty dashboard", () => {
        expect(() => RdashDocument.loadFromJson("{not json")).toThrow(SyntaxError);
    });
    it.each([DateField, DateTimeField])("writes explicit date hierarchy levels and keeps date settings", Type => {
        const data = dataSource();
        const field = new Type("OrderedOn");
        data.fields[0] = field;
        field.settings = new DateTimeFieldSettings();
        field.settings.dateFiscalYearStartMonth = 4;
        const chart = new ColumnChartVisualization("Dates", data).setLabel(new DateDataField("OrderedOn")).setValue("Sales");
        const document = new RdashDocument(); document.visualizations.push(chart);
        const json: any = document.toJson();
        expect(json.Widgets[0].VisualizationDataSpec.FormatVersion).toBe(1);
        expect(json.Widgets[0].VisualizationDataSpec.Rows.map((r: any) => r.SummarizationField.DateAggregationType))
            .toEqual(Type === DateField ? ["Year", "Month", "Day"] : ["Year", "Month", "Day", "Hour", "Minute"]);
        expect(json.Widgets[0].DataSpec.Fields[0].Settings.DateFiscalYearStartMonth).toBe(4);
        const roundTrip: any = RdashDocument.loadFromJson(JSON.stringify(json)).toJson();
        expect(roundTrip.Widgets[0].VisualizationDataSpec).toEqual(json.Widgets[0].VisualizationDataSpec);
        expect(roundTrip.Widgets[0].DataSpec.Fields[0].Settings).toEqual(json.Widgets[0].DataSpec.Fields[0].Settings);
    });
    it("projects fiscal settings from legacy JSON into the date field", () => {
        const data = dataSource();
        (data.fields[0] as DateTimeField).dataFilter = JsonConvert.deserializeObject({
            RuleType: "Today", DateFiscalYearStartMonth: 4, DisplayInLocalTimeZone: true
        }, DateTimeFilter);
        const document = new RdashDocument();
        document.visualizations.push(new GridVisualization("Dates", data));
        const field = (document.toJson() as any).Widgets[0].DataSpec.Fields[0];
        expect(field.Settings).toMatchObject({ DateFiscalYearStartMonth: 4, DisplayInLocalTimeZone: true });
        expect(field.Filter.DateFiscalYearStartMonth).toBe(0);
    });
    it("does not reuse the first hierarchy level's formatting or drill selection", () => {
        const document: any = { Widgets: [{ DataSpec: { Fields: [{ FieldName: "Date", FieldType: "Date" }] },
            VisualizationDataSpec: { FormatVersion: 0, Rows: [{ SummarizationField: {
                _type: "SummarizationDateFieldType", FieldName: "Date", DateAggregationType: "Year",
                DateFormatting: { DateFormat: "yyyy" }, DrillDownElements: ["2026"]
            } }] } }] };
        prepareModernDocument(document);
        const rows = document.Widgets[0].VisualizationDataSpec.Rows;
        expect(rows[0].SummarizationField.DateFormatting).toEqual({ DateFormat: "yyyy" });
        expect(rows[0].SummarizationField.DrillDownElements).toEqual(["2026"]);
        for (const row of rows.slice(1)) {
            expect(row.SummarizationField.DateFormatting).toBeUndefined();
            expect(row.SummarizationField.DrillDownElements).toEqual([]);
        }
    });
    it("carries single-value conditional formatting to the measure", () => {
        const text = new TextVisualization("Sales", dataSource()).setValue("Sales");
        text.settings.conditionalFormattingEnabled = true;
        text.settings.upperBand.value = 90;
        text.settings.middleBand.value = 40;
        const document = new RdashDocument(); document.visualizations.push(text);
        const bands = (document.toJson() as any).Widgets[0].VisualizationDataSpec.Value[0].SummarizationField.ConditionalFormatting.Bands;
        expect(bands).toHaveLength(3);
        expect(bands.map((band: any) => band._type)).toEqual(Array(3).fill("ConditionalFormattingBandType"));
        expect(bands[0].Value).toBe(90);
        expect(bands[1].Value).toBe(40);
    });
    it("converts XMLA drill names once and retains existing member captions", () => {
        const element = { DrillDownElements: ["[Date].[2026]", "[Date].[Q1]"],
            DrillDownMembers: [{ UniqueName: "[Date].[2026]", Caption: "Fiscal 2026" }] };
        const document = { Widgets: [{ VisualizationDataSpec: { Rows: [{ XmlaElement: element }] } }] };
        prepareModernDocument(document);
        expect(element.DrillDownElements).toEqual([]);
        expect(element.DrillDownMembers).toEqual([
            { UniqueName: "[Date].[2026]", Caption: "Fiscal 2026" }, { UniqueName: "[Date].[Q1]", Caption: "Q1" }
        ]);
        const once = JSON.stringify(document); prepareModernDocument(document);
        expect(JSON.stringify(document)).toBe(once);
    });
});

// Compiled by tsc, never executed. Beta API breaks must be enforced in declarations as well as examples.
function publicApiContract(): void {
    // @ts-expect-error Constructors require a rule.
    new DashboardDateFilter();
    // @ts-expect-error A title alone is no longer a valid selection.
    new DashboardDateFilter("Dates");
    // @ts-expect-error Field filters require a rule.
    new DateTimeFilter();
    // @ts-expect-error XMLA filters require a rule.
    new XmlaDateFilter();
    const filter = new DashboardDateFilter(DateFilterRule.allTime);
    // @ts-expect-error Legacy selection properties are private.
    filter.ruleType = "Today";
    // @ts-expect-error Legacy selection properties are private.
    filter.includeToday = false;
    // @ts-expect-error Legacy selection properties are private.
    filter.customDateRange = undefined;
    // @ts-expect-error Legacy wire rules are private.
    filter.customRule = undefined;
    const fieldFilter = new DateTimeFilter(DateFilterRule.allTime);
    // @ts-expect-error Legacy filter settings are private; use DateTimeField.settings.
    fieldFilter.dateFiscalYearStartMonth = 4;
    // @ts-expect-error Legacy filter settings are private; use DateTimeField.settings.
    fieldFilter.displayInLocalTimeZone = true;
    // @ts-expect-error Date links require both ends.
    new DateLinkFilter();
    // @ts-expect-error Date bindings require the actual date filter.
    new DashboardDateFilterBinding("Date");
    // @ts-expect-error Legacy enum is absent from the public entry point.
    type LegacyEnum = typeof import("../index")["DateRuleType"];
}
