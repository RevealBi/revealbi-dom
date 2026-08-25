import { JsonProperty } from "../../../Core/Serialization/Decorators/JsonProperty";
import { SortingType } from "../../Enums/SortingType";

/**
 * Configures a grid column used to group rows.
 */
export class GridColumnGrouping {
    constructor()
    constructor(columnName: string, sortDirection?: SortingType)
    constructor(columnName?: string, sortDirection: SortingType = SortingType.Asc) {
        this.columnName = columnName;
        this.sortDirection = sortDirection;
    }

    /**
     * Gets or sets the rendered column name used for grouping.
     */
    @JsonProperty("ColumnName")
    columnName?: string;

    /**
     * Gets or sets the direction used to sort the grouped values.
     */
    @JsonProperty("SortDirection")
    sortDirection: SortingType = SortingType.Asc;
}
