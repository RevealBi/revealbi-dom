import { SchemaTypeNames } from "../Core/Constants/SchemaTypeNames";
import { JsonProperty } from "../Core/Serialization/Decorators/JsonProperty";
import { DateRange } from "../Primitives/DateRange";
import { DateRuleType } from "./Enums/DateRuleType";
import { FilterBase } from "./FilterBase";

export class DateTimeFilter extends FilterBase
{
    constructor()
    {
        super();
        this.schemaTypeName = SchemaTypeNames.DateTimeFilterType;
    }
    
    @JsonProperty("DateFiscalYearStartMonth")
    dateFiscalYearStartMonth: number = 0;
    
    @JsonProperty("DisplayInLocalTimeZone")
    displayInLocalTimeZone: boolean = false;

    @JsonProperty("RuleType")
    ruleType: DateRuleType = DateRuleType.AllTime;
    
    @JsonProperty("CustomDateRange", { type: DateRange })
    customDateRange?: DateRange;
    
    @JsonProperty("IncludeToday")
    includeToday: boolean = true;
}