import { SchemaTypeNames } from "../../Core/Constants/SchemaTypeNames";
import { VisualizationTypes } from "../../Core/Constants/VisualizationTypes";
import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { VisualizationSettings } from "./VisualizationSettings";

export class TreeMapVisualizationSettings extends VisualizationSettings {
    constructor() {
        super();
        this.schemaTypeName = SchemaTypeNames.TreeMapVisualizationSettingsType;
        this.visualizationType = VisualizationTypes.TREE_MAP;
    }

    /**
     * Gets or sets the color index for the visualization's starting color. A zero-based index is used to set colors instead of a color name.
     * For example, an index of 5 would be the 6th color in the color scheme regardless of the theme colors being used.
     */
    @JsonProperty("BrushOffsetIndex")
    StartColorIndex?: number;

    /**
     * Gets or sets whether to show labels that display information about the categories and values.
     */
    @JsonProperty("ShowValues")
    showValues: boolean = true;
}