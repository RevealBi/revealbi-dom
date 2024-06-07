import { DataSourceItem } from "../Data/DataSourceItem";
import { ChartType } from "./Enums";
import { LinearGaugeVisualizationBase } from "./LinearGaugeVisualizationBase"
import { LinearGaugeVisualizationSettings } from "./Settings/LinearGaugeVisualizationSettings";

export class LinearGaugeVisualization extends LinearGaugeVisualizationBase<LinearGaugeVisualizationSettings> {
    constructor(title: string, dataSourceItem: DataSourceItem) {
        super(title, dataSourceItem)
        this.settings = new LinearGaugeVisualizationSettings();
        this.chartType = ChartType.LinearGauge;
    }

    configureSettings(callback: (settings: LinearGaugeVisualizationSettings) => void): this {
        callback(this.settings);
        return this;
    }
}