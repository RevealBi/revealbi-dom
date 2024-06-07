import { DataSourceItem } from "../Data/DataSourceItem";
import { CategoryVisualizationBase } from "./CategoryVisualizationBase";
import { ChartType } from "./Enums";
import { LineChartVisualizationSettings } from "./Settings/LineChartVisualizationSettings";

export class LineChartVisualization extends CategoryVisualizationBase<LineChartVisualizationSettings> {
    constructor(title: string, dataSourceItem: DataSourceItem) {
        super(title, dataSourceItem)
        this.settings = new LineChartVisualizationSettings();
        this.chartType = ChartType.Line;
    }

    configureSettings(callback: (settings: LineChartVisualizationSettings) => void): this {
        callback(this.settings);
        return this;
    }
}