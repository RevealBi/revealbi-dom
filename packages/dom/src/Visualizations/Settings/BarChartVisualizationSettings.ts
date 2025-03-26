import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { RdashChartType } from "../Enums/ChartType";
import { CategoryChartVisualizationSettings } from "./CategoryChartVisualizationSettings";

export class BarChartVisualizationSettings extends CategoryChartVisualizationSettings {
    constructor() {
        super();
        this.chartType = RdashChartType.Bar;
    }

    /**
     * Gets or sets the gap between the bars in the chart. The value is a percentage of the bar width.
     */
    @JsonProperty("CategoryAxisGap")
    public gap: number = 0.4;

    /**
     * Gets or sets the overlap between the bars in the chart. The value is a percentage of the bar width.
     */
    @JsonProperty("CategoryAxisOverlap")
    public overlap: number = -0.2;
}