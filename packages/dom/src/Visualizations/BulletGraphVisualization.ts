import { DataSourceItem } from "../Data/DataSourceItem";
import { ChartType } from "./Enums";
import { LinearGaugeVisualizationBase } from "./LinearGaugeVisualizationBase";
import { MeasureColumn, NumberDataField } from "./Primitives";
import { BulletGraphVisualizationSettings } from "./Settings/BulletGraphVisualizationSettings";
import { ColumnUtilities } from "./Utilities/ColumnUtilities";

export class BulletGraphVisualization extends LinearGaugeVisualizationBase<BulletGraphVisualizationSettings> {
    
    constructor(title: string, dataSourceItem: DataSourceItem) {
        super(title, dataSourceItem)
        this.settings = new BulletGraphVisualizationSettings();
        this.chartType = ChartType.BulletGraph;
    }
    
    public get targets(): MeasureColumn[] {
        return this.visualizationDataSpec.target;
    }
    public set targets(value: MeasureColumn[]) {
        this.visualizationDataSpec.target = value;
    }

    setTarget(field: string | NumberDataField): this {
        this.targets = ColumnUtilities.createMeasureColumns(field);
        return this;
    }

    setTargets(...fields: (string | NumberDataField)[]): this {
        this.targets = ColumnUtilities.createMeasureColumns(...fields);
        return this;
    }

    configureSettings(callback: (settings: BulletGraphVisualizationSettings) => void): this {
        callback(this.settings);
        return this;
    }
}