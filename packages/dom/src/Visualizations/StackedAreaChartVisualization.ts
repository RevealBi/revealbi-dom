import { DataSourceItem } from "../Data/DataSourceItem";
import { CategoryVisualizationBase } from "./CategoryVisualizationBase";
import { ChartType } from "./Enums";
import { StackedAreaChartVisualizationSettings } from "./Settings/StackedAreaChartVisualizationSettings";

export class StackedAreaChartVisualization extends CategoryVisualizationBase<StackedAreaChartVisualizationSettings> {
    constructor(title: string, dataSourceItem: DataSourceItem) {
        super(title, dataSourceItem)
        this.settings = new StackedAreaChartVisualizationSettings();
        this.chartType = ChartType.StackedArea;
    }

    configureSettings(callback: (settings: StackedAreaChartVisualizationSettings) => void): this {
        callback(this.settings);
        return this;
    }
}