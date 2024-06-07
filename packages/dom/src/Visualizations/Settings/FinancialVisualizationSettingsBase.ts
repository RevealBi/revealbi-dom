import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { ChartVisualizationSettingsBase } from "./ChartVisualizationSettingsBase";

export class FinancialVisualizationSettingsBase extends ChartVisualizationSettingsBase {
    /**
     * Gets or sets whether the left axis will use the Logarithmic scale. Linear is used by default.
     */
    @JsonProperty("LeftAxisLogarithmic")
    leftAxisIsLogarithmic: boolean = false;

    /**
     * Gets or sets the minimum value for the left axis. Default value is null, which also equates to zero.
     */
    @JsonProperty("LeftAxisMinValue")
    leftAxisMinValue?: number;

    /**
     * Gets or sets the maximum value for the left axis. Default value is calculated automatically depending on the values.
     */
    @JsonProperty("LeftAxisMaxValue")
    leftAxisMaxValue?: number;
}