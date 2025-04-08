import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";

export class ColumnAxis {
    @JsonProperty("Title")
    title: string = "";
}