import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";

export class ColumnConfig
{
    @JsonProperty("key")
    key?: string;

    @JsonProperty("type")
    type?: number;

    @JsonProperty("dateFormat")
    dateFormat?: string;

    @JsonProperty("uniqueName")
    uniqueName?: string;
}