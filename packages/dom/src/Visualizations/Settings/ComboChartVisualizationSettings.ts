import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { AxisDisplayMode } from "../Enums";
import { RdashChartType } from "../Enums/ChartType";
import { ComboChartType } from "../Enums/ComboChartType";
import { YAxisVisualizationSettings } from "./YAxisVisualizationSettings";

export class ComboChartVisualizationSettings extends YAxisVisualizationSettings {
    constructor() {
        super();
        this.chartType = RdashChartType.Composite;
    }

    /**
     * Gets or sets the display mode for the axis.
     */
    get axisDisplayMode(): AxisDisplayMode {
        if (this.showAxisX && this.showAxisY) {
            return AxisDisplayMode.Both;
        } else if (!this.showAxisX && !this.showAxisY) {
            return AxisDisplayMode.None;
        } else if (this.showAxisX) {
            return AxisDisplayMode.XAxis;
        } else if (this.showAxisY) {
            return AxisDisplayMode.YAxis;
        }
        throw new Error('Invalid axis visibility state.');
    }
    set axisDisplayMode(value: AxisDisplayMode) {
        switch (value) {
            case AxisDisplayMode.Both:
                this.showAxisX = true;
                this.showAxisY = true;
                break;
            case AxisDisplayMode.None:
                this.showAxisX = false;
                this.showAxisY = false;
                break;
            case AxisDisplayMode.XAxis:
                this.showAxisX = true;
                this.showAxisY = false;
                break;
            case AxisDisplayMode.YAxis:
                this.showAxisX = false;
                this.showAxisY = true;
                break;
            default:
                throw new Error('Invalid AxisMode value.');
        }
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
     * Gets or sets if the visualization will display the X axis.
     * This property is being wrapped by the AxisDisplayMode to simplify the API.
     */
    @JsonProperty("ShowAxisX")
    private showAxisX: boolean = true;

    /**
     * Gets or sets if the visualization will display the Y axis.
     * This property is being wrapped by the AxisDisplayMode to simplify the API.
     */
    @JsonProperty("ShowAxisY")
    private showAxisY: boolean = true;

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
        this.singleAxisMode = !value;
    }
}