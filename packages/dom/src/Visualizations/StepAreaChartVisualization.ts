import { DataSourceItem } from "../Data/DataSourceItem";
import { CategoryVisualizationBase } from "./CategoryVisualizationBase";
import { ChartType } from "./Enums";
import { StepAreaChartVisualizationSettings } from "./Settings/StepAreaChartVisualizationSettings";

export class StepAreaChartVisualization extends CategoryVisualizationBase<StepAreaChartVisualizationSettings> {
    constructor(title: string, dataSourceItem: DataSourceItem) {
        super(title, dataSourceItem)
        this.settings = new StepAreaChartVisualizationSettings();
        this.chartType = ChartType.StepArea;
    }

    configureSettings(callback: (settings: StepAreaChartVisualizationSettings) => void): this {
        callback(this.settings);
        return this;
    }
}