import { RdashChartType } from "../Enums/ChartType";
import { StackedVisualizationSettingsBase } from "./StackedVisualizationSettingsBase";

export class StackedBarChartVisualizationSettings extends StackedVisualizationSettingsBase {
    constructor() {
        super();
        this.chartType = RdashChartType.StackedBar;
    }
}