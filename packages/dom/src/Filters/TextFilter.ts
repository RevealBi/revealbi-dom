import { SchemaTypeNames } from "../Core/Constants/SchemaTypeNames";
import { JsonProperty } from "../Core/Serialization/Decorators/JsonProperty";
import { StringRuleType } from "./Enums/StringRuleType";
import { FilterBase } from "./FilterBase";

export class TextFilter extends FilterBase
{
    constructor()
    {
        super();
        this.schemaTypeName = SchemaTypeNames.StringFilterType;
    }
    
    @JsonProperty("RuleType")
    ruleType: StringRuleType = StringRuleType.None;
    
    @JsonProperty("Value")
    value?: string;
}