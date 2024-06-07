import { DataSourceItem } from "../Data/DataSourceItem";
import { CategoryVisualizationBase } from "./CategoryVisualizationBase";
import { ChartType } from "./Enums";
import { RadialVisualizationSettings } from "./Settings/RadialVisualizationSettings";

export class RadialVisualization extends CategoryVisualizationBase<RadialVisualizationSettings> {
    constructor(title: string, dataSourceItem: DataSourceItem) {
        super(title, dataSourceItem)
        this.settings = new RadialVisualizationSettings();
        this.chartType = ChartType.Radial;
    }

    configureSettings(callback: (settings: RadialVisualizationSettings) => void): this {
        callback(this.settings);
        return this;
    }
}