import { SchemaTypeNames } from "../Core/Constants/SchemaTypeNames";
import { JsonProperty } from "../Core/Serialization/Decorators/JsonProperty";
import { DateRange } from "../Primitives/DateRange";
import { DashboardFilter } from "./DashboardFilter";
import { DateRuleType } from "./Enums/DateRuleType";

export class DashboardDateFilter extends DashboardFilter
{
    constructor()
    constructor(title: string)
    constructor(title?: string)
    {
        super();
        this.schemaTypeName = SchemaTypeNames.DateGlobalFilterType;
        this.id = "_date";
        this.title = title ?? "Date Filter";
    }

    @JsonProperty("CustomDateRange", { type: DateRange })
    customDateRange?: DateRange;

    @JsonProperty("IncludeToday")
    includeToday: boolean = true;

    @JsonProperty("RuleType")
    ruleType: DateRuleType = DateRuleType.LastYear;
}