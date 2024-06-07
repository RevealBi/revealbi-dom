import { JsonProperty } from "../../../Core/Serialization/Decorators/JsonProperty";
import { Alignment } from "../../Enums/Alignment";

export class GridVisualizationStyle {
    @JsonProperty("FixedLeftColumns")
    fixedLeftColumns: boolean = false;

    @JsonProperty("TextAlignment")
    textAlignment: Alignment = Alignment.Inherit;

    @JsonProperty("NumericAlignment")
    numericAlignment: Alignment = Alignment.Inherit;

    @JsonProperty("DateAlignment")
    dateAlignment: Alignment = Alignment.Inherit;
}