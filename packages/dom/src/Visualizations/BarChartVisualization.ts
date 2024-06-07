import { DataSourceItem } from "../Data/DataSourceItem";
import { CategoryVisualizationBase } from "./CategoryVisualizationBase";
import { ChartType } from "./Enums";
import { BarChartVisualizationSettings } from "./Settings/BarChartVisualizationSettings";

export class BarChartVisualization extends CategoryVisualizationBase<BarChartVisualizationSettings> {
    constructor(title: string, dataSourceItem: DataSourceItem) {
        super(title, dataSourceItem)
        this.settings = new BarChartVisualizationSettings();
        this.chartType = ChartType.Bar;
    }

    configureSettings(callback: (settings: BarChartVisualizationSettings) => void): this {
        callback(this.settings);
        return this;
    }
}