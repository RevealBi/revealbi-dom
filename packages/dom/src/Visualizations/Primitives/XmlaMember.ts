import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";

export class XmlaMember
{
    @JsonProperty("UniqueName")
    uniqueName?: string;

    @JsonProperty("Caption")
    caption?: string;
}