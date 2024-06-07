import { DataSourceItem } from "../Data/DataSourceItem";
import { CategoryVisualizationBase } from "./CategoryVisualizationBase";
import { ChartType } from "./Enums";
import { StackedColumnChartVisualizationSettings } from "./Settings/StackedColumnChartVisualizationSettings";

export class StackedColumnChartVisualization extends CategoryVisualizationBase<StackedColumnChartVisualizationSettings> {
    constructor(title: string, dataSourceItem: DataSourceItem) {
        super(title, dataSourceItem)
        this.settings = new StackedColumnChartVisualizationSettings();
        this.chartType = ChartType.StackedColumn;
    }

    configureSettings(callback: (settings: StackedColumnChartVisualizationSettings) => void): this {
        callback(this.settings);
        return this;
    }
}