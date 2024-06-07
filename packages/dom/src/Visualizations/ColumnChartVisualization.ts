import { DataSourceItem } from "../Data/DataSourceItem";
import { CategoryVisualizationBase } from "./CategoryVisualizationBase";
import { ChartType } from "./Enums";
import { ColumnChartVisualizationSettings } from "./Settings/ColumnChartVisualizationSettings";

export class ColumnChartVisualization extends CategoryVisualizationBase<ColumnChartVisualizationSettings> {
    constructor(title: string, dataSourceItem: DataSourceItem) {
        super(title, dataSourceItem)
        this.settings = new ColumnChartVisualizationSettings();
        this.chartType = ChartType.Column;
    }

    configureSettings(callback: (settings: ColumnChartVisualizationSettings) => void): this {
        callback(this.settings);
        return this;
    }
}