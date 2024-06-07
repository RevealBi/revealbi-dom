import { DataSourceItem } from "../Data/DataSourceItem";
import { ChartType } from "./Enums";
import { TextVisualizationSettings } from "./Settings/TextVisualizationSettings";
import { SingleGaugeVisualizationBase } from "./SingleGaugeVisualizationBase";

export class TextVisualization extends SingleGaugeVisualizationBase<TextVisualizationSettings> {
    constructor(title: string, dataSourceItem: DataSourceItem) {
        super(title, dataSourceItem)
        this.settings = new TextVisualizationSettings();
        this.chartType = ChartType.Text;
    }

    configureSettings(callback: (settings: TextVisualizationSettings) => void): this {
        callback(this.settings);
        return this;
    }
}