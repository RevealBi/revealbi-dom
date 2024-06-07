import { RdashChartType } from "../Enums/ChartType";
import { ScatterVisualizationSettings } from "./ScatterVisualizationSettings";

export class BubbleVisualizationSettings extends ScatterVisualizationSettings {
    constructor() {
        super();
        this.chartType = RdashChartType.Bubble;
    }
}