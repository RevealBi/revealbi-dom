import { SchemaTypeNames } from "../../Core/Constants/SchemaTypeNames";
import { VisualizationTypes } from "../../Core/Constants/VisualizationTypes";
import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { VisualizationSettings } from "./VisualizationSettings";

export class CustomVisualizationSettings extends VisualizationSettings {
    constructor() {
        super();
        this.schemaTypeName = SchemaTypeNames.DiyVisualizationSettingsType;
        this.visualizationType = VisualizationTypes.JS_EXTENSION;
    }
    
    //todo: can we hide these properties from the API
    @JsonProperty("Title")
    title?: string;

    @JsonProperty("Url")
    url?: string;
}