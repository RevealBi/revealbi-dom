import { RdashChartType } from "../Enums/ChartType";
import { PieChartVisualizationSettingsBase } from "./PieChartVisualizationSettingsBase";

export class FunnelChartVisualizationSettings extends PieChartVisualizationSettingsBase {
    constructor() {
        super();
        this.chartType = RdashChartType.Funnel;
    }
}