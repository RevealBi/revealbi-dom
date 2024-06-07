import { SchemaTypeNames } from "../../Core/Constants/SchemaTypeNames";
import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { VisualizationSettings } from "./VisualizationSettings";

//todo: research this. Map API doesn't look complete in the .NET version. Class names are not clear
// should this be called GeoMapBaseVisualizationSettings? We aleard have an unused MapVisualizationSettings class in .NET... find out why

export abstract class MapVisualizationSettingsBase extends VisualizationSettings {

    constructor() {
        super();
        this.schemaTypeName = SchemaTypeNames.GeoMapBaseVisualizationSettingsType;
    }

    /**
     * Gets or sets if the map legend is displayed.
     */
    @JsonProperty("ShowLegends")
    showLegend: boolean = true;

    //this property is part of the JSON schema, but wrapped by the Visualization as it's not set in the settings
    //todo: this should be hidden from the API
    @JsonProperty("Region")
    region?: string;

    /**
     * Gets or sets the color index as a base of the map's color scheme. A zero-based index is used to set colors instead of a color name.
     * For example, an index of 5 would be the 6th color in the color scheme regardless of the theme colors being used.
     */
    @JsonProperty("ColorIndex")
    colorIndex: number = 5;
}