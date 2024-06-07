import { RdashChartType } from "../Enums/ChartType";
import { CategoryChartVisualizationSettings } from "./CategoryChartVisualizationSettings";

export class TimeSeriesVisualizationSettings extends CategoryChartVisualizationSettings {
    constructor() {
        super();
        this.chartType = RdashChartType.TimeSeries;
    }
}