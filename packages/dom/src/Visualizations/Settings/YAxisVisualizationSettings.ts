import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { AxisTitleMode } from "../Enums";
import { ChartVisualizationSettings } from "./ChartVisualizationSettings"

export abstract class YAxisVisualizationSettings extends ChartVisualizationSettings
{
    /**
     * Gets or sets whether the Y axis will use the Logarithmic scale. Linear is used by default.
     */
    @JsonProperty("LeftAxisLogarithmic")
    yAxisIsLogarithmic: boolean = false;

    /**
     * Gets or sets the minimum value for the Y axis. Default value is null, which also equates to zero.
     */
    @JsonProperty("LeftAxisMinValue")
    yAxisMinValue?: number;

    /**
     * Gets or sets the maximum value for the Y axis. Default value is calculated automatically depending on the values.
     */
    @JsonProperty("LeftAxisMaxValue")
    yAxisMaxValue?: number;

    /**
     * Gets or sets the Y axis title mode. Default value is None.
     */
    @JsonProperty("AxisTitlesMode")
    axisTitleMode: AxisTitleMode = AxisTitleMode.None;
}