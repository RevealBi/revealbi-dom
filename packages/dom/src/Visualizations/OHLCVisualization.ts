import { DataSourceItem } from "../Data/DataSourceItem";
import { ChartType } from "./Enums";
import { FinancialVisualizationBase } from "./FinancialVisualizationBase";
import { OHLCVisualizationSettings } from "./Settings/OHLCVisualizationSettings";

//TODO BROKEN
export class OHLCVisualization extends FinancialVisualizationBase<OHLCVisualizationSettings> {
    constructor(title: string, dataSourceItem: DataSourceItem) {
        super(title, dataSourceItem)
        this.settings = new OHLCVisualizationSettings();
        this.chartType = ChartType.OHLC;
    }

    configureSettings(callback: (settings: OHLCVisualizationSettings) => void): this {
        callback(this.settings);
        return this;
    }
}