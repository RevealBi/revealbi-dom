import { SchemaTypeNames } from "../../Core/Constants/SchemaTypeNames";
import { VisualizationTypes } from "../../Core/Constants/VisualizationTypes";
import { VisualizationSettings } from "./VisualizationSettings";

export class AssetVisualizationSettings extends VisualizationSettings {
    constructor() {
        super();
        this.schemaTypeName = SchemaTypeNames.AssetVisualizationSettingsType;
        this.visualizationType = VisualizationTypes.IMAGE;
    }
}