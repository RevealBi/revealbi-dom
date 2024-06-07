import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";

export class UrlBinding {

    @JsonProperty("GlobalFilterId")
    globalFilterId?: string;

    @JsonProperty("urlExpression")
    urlExpression?: string;
}