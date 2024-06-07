import { RdashChartType } from "../Enums/ChartType";
import { RoundChartVisualizationSettingsBase } from "./RoundChartVisualizationSettingsBase";

export class DoughnutChartVisualizationSettings extends RoundChartVisualizationSettingsBase {
    constructor() {
        super();
        this.chartType = RdashChartType.Doughnut;
    }
} 