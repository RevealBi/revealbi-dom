import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { RdashChartType } from "../Enums/ChartType";
import { YAxisVisualizationSettings } from "./YAxisVisualizationSettings";

export class ScatterVisualizationSettings extends YAxisVisualizationSettings {
    constructor() {
        super();
        this.chartType = RdashChartType.Scatter;
    }

    /**
     * Gets or sets if the X axis will use the Logarithmic scale. Linear is used by default.
     */
    @JsonProperty("RightAxisLogarithmic")
    xAxisIsLogarithmic: boolean = false;

    /**
     * Gets or sets the minimum value for the X axis. Default value is 0.
     */
    @JsonProperty("RightAxisMinValue")
    xAxisMinValue?: number;

    /**
     * Gets or sets the maximum value for the X axis. Default value is calculated automatically depending on the values.
     */
    @JsonProperty("RightAxisMaxValue")
    xAxisMaxValue?: number;
}