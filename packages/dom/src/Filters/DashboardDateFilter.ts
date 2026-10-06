import { SchemaTypeNames } from "../Core/Constants/SchemaTypeNames";
import { JsonProperty } from "../Core/Serialization/Decorators/JsonProperty";
import { registerJsonFactory } from "../Core/Serialization/JsonConstruction";
import { DateRange } from "../Primitives/DateRange";
import { DashboardFilter } from "./DashboardFilter";
import { DateRuleType } from "./Enums/DateRuleType";
import { FilterType } from "./Enums/FilterType";
import { DateFilterRule, RelativePeriod, dateRuleFromWire, dateRuleToWire } from "./DateFilterRule";

export class DashboardDateFilter extends DashboardFilter {
    constructor(rule: DateFilterRule);
    constructor(title: string, rule: DateFilterRule);
    constructor(titleOrRule: string | DateFilterRule, rule?: DateFilterRule) {
        super();
        this.schemaTypeName = SchemaTypeNames.DateGlobalFilterType;
        this.title = typeof titleOrRule === "string" ? titleOrRule : "Date Filter";
        this.rule = typeof titleOrRule === "string" ? rule! : titleOrRule;
    }

    @JsonProperty("RuleType")
    private ruleType: DateRuleType = DateRuleType.LastYear;
    @JsonProperty("CustomDateRange", { type: DateRange })
    private customDateRange?: DateRange;
    @JsonProperty("IncludeToday")
    private includeToday = true;
    @JsonProperty("CustomRule", { type: RelativePeriod })
    private customRule?: RelativePeriod;

    get rule(): DateFilterRule { return dateRuleFromWire({ ruleType: this.ruleType,
        customDateRange: this.customDateRange, customRule: this.customRule, includeToday: this.includeToday }); }
    set rule(value: DateFilterRule) {
        const state = dateRuleToWire(value);
        this.ruleType = state.ruleType;
        this.customDateRange = state.customDateRange;
        this.customRule = state.customRule;
        this.includeToday = state.includeToday;

    }
    setRule(rule: DateFilterRule): this { this.rule = rule; return this; }
    static {
        registerJsonFactory(this, () => {
            const instance = new DashboardDateFilter(DateFilterRule.allTime);
            instance.ruleType = DateRuleType.LastYear;
            instance.id = "_date";
            return instance;
        });
    }
}