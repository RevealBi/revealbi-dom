import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { SortingType } from "../Enums/SortingType";

/**
 * Represents the sort configuration for a single grid column.
 */
export class GridColumnSortDescription {
    /**
     * Gets or sets the name of the column being sorted.
     */
    @JsonProperty("ColumnName")
    columnName?: string;

    /**
     * Gets or sets the sort direction for the column.
     */
    @JsonProperty("SortDirection")
    sortDirection: SortingType = SortingType.Asc;
}
