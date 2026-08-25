import { JsonProperty } from "../../../Core/Serialization/Decorators/JsonProperty";
import { GridSummaryType } from "../../Enums/GridSummaryType";

/**
 * Configures the summary calculation displayed for a grid column.
 */
export class GridColumnSummary {
    constructor()
    constructor(columnName: string, summaryType?: GridSummaryType)
    constructor(columnName?: string, summaryType: GridSummaryType = GridSummaryType.Sum) {
        this.columnName = columnName;
        this.summaryType = summaryType;
    }

    /**
     * Gets or sets the rendered column name to summarize.
     */
    @JsonProperty("ColumnName")
    columnName?: string;

    /**
     * Gets or sets the calculation used to summarize the column.
     */
    @JsonProperty("Operand")
    summaryType: GridSummaryType = GridSummaryType.Sum;
}
