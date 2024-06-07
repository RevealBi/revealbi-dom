import { RdashChartType } from "../Enums/ChartType";
import { FinancialVisualizationSettingsBase } from "./FinancialVisualizationSettingsBase";

export class OHLCVisualizationSettings extends FinancialVisualizationSettingsBase {
    constructor() {
        super();
        this.chartType = RdashChartType.OHLC;
    }
}