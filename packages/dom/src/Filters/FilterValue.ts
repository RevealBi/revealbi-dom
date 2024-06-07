import { JsonProperty } from "../Core/Serialization/Decorators/JsonProperty";

export class FilterValue
{
    @JsonProperty("Name")
    name?: string;

    @JsonProperty("Value")
    value?: any;
}