import { DataSourceItem } from "../Data/DataSourceItem";
import { CategoryVisualizationBase } from "./CategoryVisualizationBase";
import { ChartType } from "./Enums";
import { AreaChartVisualizationSettings } from "./Settings/AreaChartVisualizationSettings";

export class AreaChartVisualization extends CategoryVisualizationBase<AreaChartVisualizationSettings> {
    constructor(title: string, dataSourceItem: DataSourceItem) {
        super(title, dataSourceItem)
        this.settings = new AreaChartVisualizationSettings();
        this.chartType = ChartType.Area;
    }

    configureSettings(callback: (settings: AreaChartVisualizationSettings) => void): this {
        callback(this.settings);
        return this;
    }
}