import { SchemaTypeNames } from "../Core/Constants/SchemaTypeNames";
import { JsonProperty } from "../Core/Serialization/Decorators/JsonProperty";
import { NumberRuleType } from "./Enums/NumberRuleType";
import { XmlaFilterRule } from "./XmlaFilterRule";

export class XmlaNumberFilterRule extends XmlaFilterRule
{
    constructor()
    {
        super();
        this.schemaTypeName = SchemaTypeNames.XmlaNumberFilterRuleType;
    }

    @JsonProperty("RuleType")
    ruleType: NumberRuleType = NumberRuleType.None;
    
    @JsonProperty("Value")
    value?: number;
}