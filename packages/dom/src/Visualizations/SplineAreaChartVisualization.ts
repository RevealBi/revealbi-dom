import { DataSourceItem } from "../Data/DataSourceItem";
import { CategoryVisualizationBase } from "./CategoryVisualizationBase";
import { ChartType } from "./Enums";
import { SplineAreaChartVisualizationSettings } from "./Settings/SplineAreaChartVisualizationSettings";

export class SplineAreaChartVisualization extends CategoryVisualizationBase<SplineAreaChartVisualizationSettings> {
    constructor(title: string, dataSourceItem: DataSourceItem) {
        super(title, dataSourceItem)
        this.settings = new SplineAreaChartVisualizationSettings();
        this.chartType = ChartType.SplineArea;
    }

    configureSettings(callback: (settings: SplineAreaChartVisualizationSettings) => void): this {
        callback(this.settings);
        return this;
    }
}