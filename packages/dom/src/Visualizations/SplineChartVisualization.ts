import { DataSourceItem } from "../Data/DataSourceItem";
import { CategoryVisualizationBase } from "./CategoryVisualizationBase";
import { ChartType } from "./Enums";
import { SplineChartVisualizationSettings } from "./Settings/SplineChartVisualizationSettings";

export class SplineChartVisualization extends CategoryVisualizationBase<SplineChartVisualizationSettings> {
    constructor(title: string, dataSourceItem: DataSourceItem) {
        super(title, dataSourceItem)
        this.settings = new SplineChartVisualizationSettings();
        this.chartType = ChartType.Spline;
    }

    configureSettings(callback: (settings: SplineChartVisualizationSettings) => void): this {
        callback(this.settings);
        return this;
    }
}