import { RdashChartType } from "../Enums/ChartType";
import { StackedVisualizationSettingsBase } from "./StackedVisualizationSettingsBase";

export class StackedColumnChartVisualizationSettings extends StackedVisualizationSettingsBase {
    constructor() {
        super();
        this.chartType = RdashChartType.StackedColumn;
    }
}