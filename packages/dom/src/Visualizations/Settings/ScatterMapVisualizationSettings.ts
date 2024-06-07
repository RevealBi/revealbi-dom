import { SchemaTypeNames } from "../../Core/Constants/SchemaTypeNames";
import { VisualizationTypes } from "../../Core/Constants/VisualizationTypes";
import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { MapColorMode } from "../Enums/MapColorMode";
import { MapConditionalFormatting } from "../Primitives/MapConditionalFormatting";
import { MapZoomRectangle } from "../Primitives/MapZoomRectangle";
import { MapVisualizationSettingsBase } from "./MapVisualizationSettingsBase";

export class ScatterMapVisualizationSettings extends MapVisualizationSettingsBase {
    constructor() {
        super();
        this.schemaTypeName = SchemaTypeNames.ScatterMapVisualizationSettingsType;
        this.visualizationType = VisualizationTypes.SCATTER_MAP;
    }

     /// Gets the styling rules for each range of data - upper, middle, and lower. Only applies when ColorMode is set to MapColorMode.ConditionalFormatting/>.
    @JsonProperty("ConditionalFormatting", { type: MapConditionalFormatting})
    conditionalFormatting: MapConditionalFormatting = new MapConditionalFormatting();

        /// Gets or sets how the markers will be colored. Only applied when setting colors by value.
        @JsonProperty("ColorizationMode")
        colorMode: MapColorMode = MapColorMode.RangeOfValues;

        /// Gets or sets the zoom level at which image tiles will appear.
        @JsonProperty("ZoomThreshold")
        imageTileZoomLevel: number = 3;

        /// Gets or sets whether to show image tiles from one of the supported image tile providers. Image tile providers include Bing, ESRI, and MapBox.
        @JsonProperty("ShowTileSource")
        showImageTiles: boolean = true;

        /// Gets or sets whether to automatically create a unique marker for each category by using combinations between colors and symbols such as squares, triangles, dots, stars, octagons, etc.
        /// Only applied when setting colors by category.
        @JsonProperty("UseDifferentMarkers")
        useDifferentMarkers: boolean = false;

        /// Gets the zoom and position of the map.
        @JsonProperty("ZoomRectangle")
        zoom: MapZoomRectangle = new MapZoomRectangle();
}