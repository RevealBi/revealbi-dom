import { SchemaTypeNames } from "../Core/Constants/SchemaTypeNames";
import { JsonProperty } from "../Core/Serialization/Decorators/JsonProperty";
import { DateRange } from "../Primitives/DateRange";
import { TimeRuleType } from "./Enums/TimeRuleType";
import { FilterBase } from "./FilterBase";

export class TimeFilter extends FilterBase
{
    constructor()
    {
        super();
        this.schemaTypeName = SchemaTypeNames.TimeFilterType;
    }

    @JsonProperty("RuleType")
    ruleType: TimeRuleType = TimeRuleType.AllTime;

    @JsonProperty("CustomTimeRange", { type: DateRange })
    customTimeRange?: DateRange;
}