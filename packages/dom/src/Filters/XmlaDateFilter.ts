import { SchemaTypeNames } from "../Core/Constants/SchemaTypeNames";
import { JsonProperty } from "../Core/Serialization/Decorators/JsonProperty";
import { DateRange } from "../Primitives/DateRange";
import { DateRuleType } from "./Enums/DateRuleType";
import { FilterBase } from "./FilterBase";

export class XmlaDateFilter extends FilterBase
{
    constructor()
    {
        super();
        this.schemaTypeName = SchemaTypeNames.XmlaDateFilterType;
    }

    @JsonProperty("RuleType")
    ruleType: DateRuleType = DateRuleType.AllTime;

    @JsonProperty("CustomDateRange", { type: DateRange })
    customDateRange?: DateRange;

    @JsonProperty("IncludeToday")
    includeToday: boolean = true;
}