import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { SortingType } from "../Enums/SortingType";

/**
 * Represents the grouping configuration for a single grid column.
 */
export class GridColumnGroupDescription {
    /**
     * Gets or sets the name of the column being grouped.
     */
    @JsonProperty("ColumnName")
    columnName?: string;

    /**
     * Gets or sets the sort direction applied within the group.
     */
    @JsonProperty("SortDirection")
    sortDirection: SortingType = SortingType.Asc;
}
