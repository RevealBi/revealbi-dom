import { DataSourceItem } from "../Data/DataSourceItem";
import { CategoryVisualizationBase } from "./CategoryVisualizationBase";
import { ChartType } from "./Enums";
import { StackedBarChartVisualizationSettings } from "./Settings/StackedBarChartVisualizationSettings";

export class StackedBarChartVisualization extends CategoryVisualizationBase<StackedBarChartVisualizationSettings> {
    constructor(title: string, dataSourceItem: DataSourceItem) {
        super(title, dataSourceItem)
        this.settings = new StackedBarChartVisualizationSettings();
        this.chartType = ChartType.StackedBar;
    }

    configureSettings(callback: (settings: StackedBarChartVisualizationSettings) => void): this {
        callback(this.settings);
        return this;
    }
}