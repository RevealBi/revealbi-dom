import { SchemaTypeNames } from "../Core/Constants/SchemaTypeNames";
import { JsonProperty } from "../Core/Serialization/Decorators/JsonProperty";
import { StringRuleType } from "./Enums/StringRuleType";
import { XmlaFilterRule } from "./XmlaFilterRule";

export class XmlaStringFilterRule extends XmlaFilterRule
{
    constructor()
    {
        super();
        this.schemaTypeName = SchemaTypeNames.XmlaStringFilterRuleType;
    }

    @JsonProperty("RuleType")
    ruleType: StringRuleType = StringRuleType.None;
    
    @JsonProperty("Value")
    value?: string;
}