import { JsonProperty } from "../Core/Serialization/Decorators/JsonProperty";
import { JsonConvert } from "../Core/Serialization/JsonConvert";
import { SchemaType } from "../Core/SchemaType";
import { DateRange } from "../Primitives/DateRange";
import { DateRuleType } from "./Enums/DateRuleType";
import { PeriodType } from "./Enums/PeriodType";

// Wire-only types and helpers are not exported by the package entry point.
export class RelativePeriod extends SchemaType {
    constructor() { super(); this.schemaTypeName = "DateRuleType"; }
    @JsonProperty("Relation") relation = "All";
    @JsonProperty("Count") count = 1;
    @JsonProperty("Period") period: PeriodType = PeriodType.Day;
    private today?: boolean;
    @JsonProperty("IncludeToday")
    get includeToday(): boolean | undefined { return this.today; }
    set includeToday(value: boolean | null | undefined) { this.today = value ?? undefined; }
}

export interface DateRuleState {
    ruleType: DateRuleType;
    customDateRange?: DateRange;
    customRule?: RelativePeriod;
    includeToday: boolean;
}

function copyState(state: DateRuleState): DateRuleState {
    return {
        ruleType: state.ruleType,
        includeToday: state.includeToday,
        customRule: state.ruleType === DateRuleType.CustomRule && state.customRule
            ? JsonConvert.deserializeObject(JsonConvert.serializeObject(state.customRule), RelativePeriod) : undefined,
        customDateRange: state.ruleType === DateRuleType.CustomRange && state.customDateRange
            ? JsonConvert.deserializeObject(JsonConvert.serializeObject(state.customDateRange), DateRange) : undefined
    };
}

const states = new WeakMap<DateFilterRule, DateRuleState>();
let createFromWire: (state: DateRuleState) => DateFilterRule;

/** An immutable date selection. Assign it to a filter's rule or pass it to its constructor. */
export class DateFilterRule {
    declare private readonly dateRuleBrand: void;
    private constructor(state: DateRuleState) { states.set(this, copyState(state)); }
    static { createFromWire = state => new DateFilterRule(state); }

    /** A rolling window ending today; false evaluates it as of yesterday. */
    static last(count: number, period: PeriodType, includeToday = true): DateFilterRule {
        return this.relative("Last", count, period, includeToday);
    }
    /** Complete upcoming periods, starting at the beginning of the next period. */
    static next(count: number, period: PeriodType): DateFilterRule {
        return this.relative("Next", count, period);
    }
    /** Complete periods immediately preceding the current period. */
    static previous(count: number, period: PeriodType): DateFilterRule {
        return this.relative("Previous", count, period);
    }
    static this(period: PeriodType): DateFilterRule { return this.relative("This", 1, period); }
    static toDate(period: PeriodType, includeToday = true): DateFilterRule {
        return this.relative("ToDate", 1, period, includeToday);
    }
    /** Inclusive range; null/undefined endpoints leave that side unrestricted. */
    static custom(from?: Date | null, to?: Date | null): DateFilterRule {
        for (const date of [from, to]) {
            if (date != null && (!(date instanceof Date) || !Number.isFinite(date.getTime())))
                throw new RangeError("Date range endpoints must be valid dates.");
        }
        if (from && to && from > to) throw new RangeError("The end of the range must not precede its start.");
        return new DateFilterRule({ ruleType: DateRuleType.CustomRange, includeToday: true,
            customDateRange: new DateRange(from ?? undefined, to ?? undefined) });
    }
    static get allTime(): DateFilterRule {
        return new DateFilterRule({ ruleType: DateRuleType.AllTime, includeToday: true });
    }
    private static relative(relation: string, count: number, period: PeriodType, includeToday?: boolean): DateFilterRule {
        if (!Number.isSafeInteger(count) || count <= 0 || count > 2147483647)
            throw new RangeError("The number of periods must be a positive 32-bit integer.");
        if (!Object.values(PeriodType).includes(period)) throw new RangeError("Invalid period.");
        if (includeToday !== undefined && typeof includeToday !== "boolean") throw new TypeError("includeToday must be a boolean.");
        const customRule = Object.assign(new RelativePeriod(), { relation, count, period, includeToday });
        return new DateFilterRule({ ruleType: DateRuleType.CustomRule, includeToday: true, customRule });
    }
}

export function dateRuleFromWire(state: DateRuleState): DateFilterRule { return createFromWire(state); }
export function dateRuleToWire(rule: DateFilterRule): DateRuleState {
    const state = rule && states.get(rule);
    if (!state) throw new TypeError("A DateFilterRule is required.");
    return copyState(state);
}
