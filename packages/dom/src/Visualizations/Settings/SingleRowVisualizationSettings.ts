import { SchemaTypeNames } from "../../Core/Constants/SchemaTypeNames";
import { VisualizationTypes } from "../../Core/Constants/VisualizationTypes";
import { VisualizationSettings } from "./VisualizationSettings";

export class SingleRowVisualizationSettings extends VisualizationSettings {
    constructor() {
        super();
        this.schemaTypeName = SchemaTypeNames.SingleRowVisualizationSettingsType;
        this.visualizationType = VisualizationTypes.SINGLE_ROW;
    }
}