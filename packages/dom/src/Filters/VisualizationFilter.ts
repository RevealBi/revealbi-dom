import { JsonProperty } from "../Core/Serialization/Decorators/JsonProperty";

export class VisualizationFilter
{
    constructor()
    constructor(fieldName: string)
    constructor(fieldName?: string) {
        this.fieldName = fieldName;
    }

    @JsonProperty("FieldName")
    fieldName?: string;
}