import { DataSourceItem } from "../Data/DataSourceItem";
import { ChartType } from "./Enums";
import { FinancialVisualizationBase } from "./FinancialVisualizationBase";
import { CandleStickVisualizationSettings } from "./Settings/CandleStickVisualizationSettings";

//- TODO BROKEN
export class CandleStickVisualization extends FinancialVisualizationBase<CandleStickVisualizationSettings> {
    constructor(title: string, dataSourceItem: DataSourceItem) {
        super(title, dataSourceItem)
        this.settings = new CandleStickVisualizationSettings();
        this.chartType = ChartType.Candlestick;
    }

    configureSettings(callback: (settings: CandleStickVisualizationSettings) => void): this {
        callback(this.settings);
        return this;
    }
}