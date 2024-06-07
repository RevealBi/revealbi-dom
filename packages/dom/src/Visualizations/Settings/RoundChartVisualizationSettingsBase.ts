import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { PieChartVisualizationSettingsBase } from "./PieChartVisualizationSettingsBase";

export abstract class RoundChartVisualizationSettingsBase extends PieChartVisualizationSettingsBase {

    /**
     * Gets or sets the slice rotation, in degrees, to change the order in which your data is presented. Supported values include 0, 90, 180, and 270.
     */
    @JsonProperty("PieStartPosition")
    startPosition?: number;

    /**
     * Gets or sets the option to see all data values in the field added as the "Label", including data items with the value of 0 (zero).
     */
    @JsonProperty("ShowZeroValuesInLegend")
    showZeroValuesInLegend: boolean = false;
}