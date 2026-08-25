import { JsonProperty } from "../../../Core/Serialization/Decorators/JsonProperty";
import { Alignment } from "../../Enums/Alignment";
import { GridColumnPinPosition } from "../../Enums/GridColumnPinPosition";
import { GridColumnHyperlink } from "./GridColumnHyperlink";

/**
 * Configures the appearance and behavior of a grid column.
 */
export class GridColumnSettings {
    constructor()
    constructor(columnName: string)
    constructor(columnName?: string) {
        this.columnName = columnName;
    }

    /**
     * Gets or sets the rendered column name that these settings apply to.
     */
    @JsonProperty("ColumnName")
    columnName?: string;

    /**
     * Gets or sets the column width.
     */
    @JsonProperty("Width")
    width?: number;

    /**
     * Gets or sets the column's text alignment.
     */
    @JsonProperty("TextAlignment")
    textAlignment: Alignment = Alignment.Inherit;

    /**
     * Gets or sets whether and where the column is pinned.
     */
    @JsonProperty("Pinning")
    pinPosition: GridColumnPinPosition = GridColumnPinPosition.Inherit;

    /**
     * Gets or sets the hyperlink displayed by the column.
     */
    @JsonProperty("Hyperlink", { type: GridColumnHyperlink })
    hyperlink?: GridColumnHyperlink;
}
