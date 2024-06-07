import { SchemaTypeNames } from "../Core/Constants/SchemaTypeNames";
import { JsonProperty } from "../Core/Serialization/Decorators/JsonProperty";
import { NumberRuleType } from "./Enums/NumberRuleType";
import { FilterBase } from "./FilterBase";

export class NumberFilter extends FilterBase
{
    constructor()
    {
        super();
        this.schemaTypeName = SchemaTypeNames.NumberFilterType;
    }
    
    @JsonProperty("RuleType")
    ruleType: NumberRuleType = NumberRuleType.None;
    
    @JsonProperty("Value")
    value?: number;
}