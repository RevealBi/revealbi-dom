import { SchemaTypeNames } from "../../Core/Constants/SchemaTypeNames";
import { VisualizationTypes } from "../../Core/Constants/VisualizationTypes";
import { VisualizationSettings } from "./VisualizationSettings";

export class TextBoxVisualizationSettings extends VisualizationSettings {
    constructor() {
        super();
        this.schemaTypeName = SchemaTypeNames.TextBoxVisualizationSettingsType;
        this.visualizationType = VisualizationTypes.TEXT_BOX;
    }
}