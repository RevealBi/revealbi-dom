import { SchemaTypeNames } from "../../Core/Constants/SchemaTypeNames";
import { VisualizationTypes } from "../../Core/Constants/VisualizationTypes";
import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { MapColorStyle } from "../Enums/MapColorStyle";
import { MapDataLocale } from "../Enums/MapDataLocale";
import { MapLabelStyle } from "../Enums/MapLabelStyle";
import { MapLabelVisibility } from "../Enums/MapLabelVisibility";
import { MapVisualizationSettingsBase } from "./MapVisualizationSettingsBase";

export class ChoroplethVisualizationSettings extends MapVisualizationSettingsBase {
    constructor() {
        super();
        this.schemaTypeName = SchemaTypeNames.ChoroplethMapVisualizationSettingsType;
        this.visualizationType = VisualizationTypes.CHOROPLETH_MAP;
    }

    /**
    * Gets or sets how the map color will be applied to regions that contain data.
    */
    @JsonProperty("ColorizationStyle")
    colorStyle: MapColorStyle = MapColorStyle.RangeOfValues;

    /**
    * Gets or sets whether labels will be displayed on the regions.
    */
    @JsonProperty("LabelVisibility")
    labelVisibility: MapLabelVisibility = MapLabelVisibility.HasValues;

    /**
    * Gets or sets whether the labels are displayed as abbrevaited geographical names, or as values.
    */
    @JsonProperty("LabelStyle")
    labelStyle: MapLabelStyle = MapLabelStyle.LocationAbbreviation;

    /**
    * Gets or sets the language locale to use for the map.
    */
    @JsonProperty("DataLocale")
    dataLocale: MapDataLocale = MapDataLocale.English;
}