import { DataSourceItem } from "../Data/DataSourceItem";
import { CategoryVisualizationBase } from "./CategoryVisualizationBase";
import { ChartType } from "./Enums";
import { StepLineChartVisualizationSettings } from "./Settings/StepLineChartVisualizationSettings";

export class StepLineChartVisualization extends CategoryVisualizationBase<StepLineChartVisualizationSettings> {
    constructor(title: string, dataSourceItem: DataSourceItem) {
        super(title, dataSourceItem)
        this.settings = new StepLineChartVisualizationSettings();
        this.chartType = ChartType.StepLine;
    }

    configureSettings(callback: (settings: StepLineChartVisualizationSettings) => void): this {
        callback(this.settings);
        return this;
    }
}