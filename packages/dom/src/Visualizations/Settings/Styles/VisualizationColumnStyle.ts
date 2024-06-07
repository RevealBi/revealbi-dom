import { JsonProperty } from "../../../Core/Serialization/Decorators/JsonProperty";
import { Alignment } from "../../Enums/Alignment";

export class VisualizationColumnStyle{
    @JsonProperty("ColumnName")
    columnName?: string;

    @JsonProperty("Width")
    width?: number;

    @JsonProperty("TextAlignment")
    textAlignment: Alignment = Alignment.Inherit;
}