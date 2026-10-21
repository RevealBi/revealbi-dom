import { SchemaTypeNames } from "../Core/Constants/SchemaTypeNames";
import { JsonProperty } from "../Core/Serialization/Decorators/JsonProperty";
import { registerJsonFactory } from "../Core/Serialization/JsonConstruction";
import { DateRange } from "../Primitives/DateRange";
import { FilterBase } from "./FilterBase";
import { DateRuleType } from "./Enums/DateRuleType";
import { FilterType } from "./Enums/FilterType";
import { DateFilterRule, RelativePeriod, dateRuleFromWire, dateRuleToWire } from "./DateFilterRule";

export class XmlaDateFilter extends FilterBase {
    constructor(rule: DateFilterRule) {
        super(); this.schemaTypeName = SchemaTypeNames.XmlaDateFilterType; this.rule = rule;
    }

    @JsonProperty("RuleType")
    private ruleType: DateRuleType = DateRuleType.AllTime;
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
        this.filterType = FilterType.FilterByRule; this.selectedValues = undefined;
    }
    setRule(rule: DateFilterRule): this { this.rule = rule; return this; }
    static {
        registerJsonFactory(this, () => {
            const instance = new XmlaDateFilter(DateFilterRule.allTime);
            instance.ruleType = DateRuleType.AllTime;
            instance.filterType = FilterType.AllValues;
            return instance;
        });
    }
}