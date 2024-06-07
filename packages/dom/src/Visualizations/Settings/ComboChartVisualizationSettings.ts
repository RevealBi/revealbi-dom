import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { RdashChartType } from "../Enums/ChartType";
import { ComboChartType } from "../Enums/ComboChartType";
import { YAxisVisualizationSettings } from "./YAxisVisualizationSettings";

export class ComboChartVisualizationSettings extends YAxisVisualizationSettings {
    constructor() {
        super();
        this.chartType = RdashChartType.Composite;
    }

    /**
     * Gets or sets whether Chart2 is overlayed on top of Chart1 with an opacity applied to the chart on top.
     */
    @JsonProperty("CompositeChartTypesSwapped")
    chart2OnTop: boolean = false;

    /**
     * Gets or sets the chart type for Chart1
     */
    @JsonProperty("CompositeChartType1")
    chart1Type: ComboChartType = ComboChartType.Column;

    /**
     * Gets or sets the chart type for Chart2
     */
    @JsonProperty("CompositeChartType2")
    chart2Type: ComboChartType = ComboChartType.Line;

    /**
     * Gets or sets if the right axis will use the Logarithmic scale. Linear is used by default.
     */
    @JsonProperty("RightAxisLogarithmic")
    rightAxisIsLogarithmic: boolean = false;

    /**
     * Gets or sets the minimum value for the right axis. Default value is 0.
     */
    @JsonProperty("RightAxisMinValue")
    rightAxisMinValue?: number;

    /**
     * Gets or sets the maximum value for the right axis. Default value is calculated automatically depending on the values.
     */
    @JsonProperty("RightAxisMaxValue")
    rightAxisMaxValue?: number;

    /**
     * This property is being wrapped by the showRightAxis in order to match the UI experience. This property is needed for the reveal JSON schema.
     */
    @JsonProperty("SingleAxisMode")
    private singleAxisMode: boolean = false;

    /**
     * Gets if the visualization will display the right axis.
     */
    get showRightAxis(): boolean {
        return !this.singleAxisMode;
    }

    /**
     * Sets if the visualization will display the right axis.
     */
    set showRightAxis(value: boolean) {
        this.singleAxisMode = value;
    }
}