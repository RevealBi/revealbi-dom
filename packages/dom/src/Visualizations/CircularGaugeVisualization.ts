import { DataSourceItem } from "../Data/DataSourceItem";
import { ChartType } from "./Enums";
import { CircularGaugeVisualizationSettings } from "./Settings/CircularGaugeVisualizationSettings";
import { SingleGaugeVisualizationBase } from "./SingleGaugeVisualizationBase";

export class CircularGaugeVisualization extends SingleGaugeVisualizationBase<CircularGaugeVisualizationSettings> {
    constructor(title: string, dataSourceItem: DataSourceItem) {
        super(title, dataSourceItem)
        this.settings = new CircularGaugeVisualizationSettings();
        this.chartType = ChartType.CircularGauge;
    }

    configureSettings(callback: (settings: CircularGaugeVisualizationSettings) => void): this {
        callback(this.settings);
        return this;
    }
}