import { DataSourceItem } from "../Data/DataSourceItem";
import { ChartType } from "./Enums";
import { PieChartVisualizationSettings } from "./Settings/PieChartVisualizationSettings";
import { SingleValueLabelsVisualizationBase } from "./SingleValueLabelsVisualizationBase";

export class PieChartVisualization extends SingleValueLabelsVisualizationBase<PieChartVisualizationSettings> {
    constructor(title: string, dataSourceItem: DataSourceItem) {
        super(title, dataSourceItem)
        this.settings = new PieChartVisualizationSettings();
        this.chartType = ChartType.Pie;
    }

    configureSettings(callback: (settings: PieChartVisualizationSettings) => void): this {
        callback(this.settings);
        return this;
    }
}