import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { ChartVisualizationSettings } from "./ChartVisualizationSettings"

export abstract class YAxisVisualizationSettings extends ChartVisualizationSettings
{
    /// <summary>
    /// Gets or sets whether the Y axis will use the Logarithmic scale. Linear is used by default.
    /// </summary>
    @JsonProperty("LeftAxisLogarithmic")
    yAxisIsLogarithmic: boolean = false;

    /// <summary>
    /// Gets or sets the minimum value for the Y axis. Default value is null, which also equates to zero.
    /// </summary>
    @JsonProperty("LeftAxisMinValue")
    yAxisMinValue?: number;

    /// <summary>
    /// Gets or sets the maximum value for the Y axis. Default value is calculated automatically depending on the values.
    /// </summary>
    @JsonProperty("LeftAxisMaxValue")
    yAxisMaxValue?: number;
}