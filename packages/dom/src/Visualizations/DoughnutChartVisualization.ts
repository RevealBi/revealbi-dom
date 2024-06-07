import { DataSourceItem } from "../Data/DataSourceItem";
import { ChartType } from "./Enums";
import { DoughnutChartVisualizationSettings } from "./Settings/DoughnutChartVisualizationSettings";
import { SingleValueLabelsVisualizationBase } from "./SingleValueLabelsVisualizationBase";

export class DoughnutChartVisualization extends SingleValueLabelsVisualizationBase<DoughnutChartVisualizationSettings> {
    constructor(title: string, dataSourceItem: DataSourceItem) {
        super(title, dataSourceItem)
        this.settings = new DoughnutChartVisualizationSettings();
        this.chartType = ChartType.Doughnut;
    }

    configureSettings(callback: (settings: DoughnutChartVisualizationSettings) => void): this {
        callback(this.settings);
        return this;
    }
}