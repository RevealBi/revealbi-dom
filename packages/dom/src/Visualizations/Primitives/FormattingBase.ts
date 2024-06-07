import { SchemaType } from "../../Core/SchemaType";
import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";

export abstract class FormattingBase extends SchemaType
{
    @JsonProperty("OverrideDefaultSettings")
    overrideDefaultSettings: boolean = false;
}