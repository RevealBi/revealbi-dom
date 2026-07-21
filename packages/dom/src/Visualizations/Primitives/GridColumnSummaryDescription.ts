import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { GridColumnSummaryOperand } from "../Enums/GridColumnSummaryOperand";

/**
 * Represents the summary (aggregation) configuration for a single grid column.
 */
export class GridColumnSummaryDescription {
    /**
     * Gets or sets the name of the column being summarized.
     */
    @JsonProperty("ColumnName")
    columnName?: string;

    /**
     * Gets or sets the aggregation operand applied to the column.
     */
    @JsonProperty("Operand")
    operand: GridColumnSummaryOperand = GridColumnSummaryOperand.Sum;
}
