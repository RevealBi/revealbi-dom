import { RdashChartType } from "../Enums/ChartType";
import { FinancialVisualizationSettingsBase } from "./FinancialVisualizationSettingsBase";

export class CandleStickVisualizationSettings extends FinancialVisualizationSettingsBase {
    constructor() {
        super();
        this.chartType = RdashChartType.Candlestick;
    }
}