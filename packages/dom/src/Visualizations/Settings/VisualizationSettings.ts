import { SchemaType } from "../../Core/SchemaType";
import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";

export abstract class VisualizationSettings extends SchemaType {
    @JsonProperty("VisualizationType")
    protected visualizationType: string | undefined;
}