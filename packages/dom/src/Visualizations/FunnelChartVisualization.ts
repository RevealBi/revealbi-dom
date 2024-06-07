import { DataSourceItem } from "../Data/DataSourceItem";
import { ChartType } from "./Enums";
import { FunnelChartVisualizationSettings } from "./Settings/FunnelChartVisualizationSettings";
import { SingleValueLabelsVisualizationBase } from "./SingleValueLabelsVisualizationBase";

export class FunnelChartVisualization extends SingleValueLabelsVisualizationBase<FunnelChartVisualizationSettings> {
    constructor(title: string, dataSourceItem: DataSourceItem) {
        super(title, dataSourceItem)
        this.settings = new FunnelChartVisualizationSettings();
        this.chartType = ChartType.Funnel;
    }

    configureSettings(callback: (settings: FunnelChartVisualizationSettings) => void): this {
        callback(this.settings);
        return this;
    }
}