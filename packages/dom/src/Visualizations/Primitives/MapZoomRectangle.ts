import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";

export class MapZoomRectangle {
    /**
     * Gets or sets the longitude of the top-left corner of the map. This will need to be adjusted based on the map shape being used.
     */
    @JsonProperty("X")
    longitude: number = 0;

    /**
     * Gets or sets the latitude of the top-left corner of the map.
     */
    @JsonProperty("Y")
    latitude: number = 0;

    /**
     * Gets or sets the degrees of longitude.
     */
    @JsonProperty("Width")
    degreesLongitude: number = 0;

    /**
     * Gets or sets the degrees of latitude.
     */
    @JsonProperty("Height")
    degreesLatitude: number = 0;
}