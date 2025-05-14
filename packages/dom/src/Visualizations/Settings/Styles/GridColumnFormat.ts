import { JsonProperty } from "../../../Core/Serialization/Decorators/JsonProperty";
import { Alignment } from "../../Enums/Alignment";

/**
 * Represents the format settings for a grid column.
 */
export class GridColumnFormat{
    /**
     * Gets or sets the column name.
     * This property is used to identify the column in the grid.
     */
    @JsonProperty("ColumnName")
    columnName?: string;

    /**
     * Gets or sets the column width.
     */
    @JsonProperty("Width")
    width?: number;

    /**
     * Gets or sets the column alignment.
     */
    @JsonProperty("TextAlignment")
    textAlignment: Alignment = Alignment.Inherit;
}