import { JsonProperty } from "../Core/Serialization/Decorators/JsonProperty";
import { DataSourceItem } from "../Data/DataSourceItem";
import { ChartType } from "./Enums";
import { DimensionDataField, NumberDataField } from "./Primitives";
import { DimensionColumn } from "./Primitives/DimensionColumn";
import { MeasureColumn } from "./Primitives/MeasureColumn";
import { ScatterVisualizationSettings } from "./Settings/ScatterVisualizationSettings";
import { TabularVisualizationBase } from "./TabularVisualizationBase";
import { ColumnUtilities } from "./Utilities/ColumnUtilities";
import { ScatterVisualizationDataSpec } from "./VisualizationSpecs/ScatterVisualizationDataSpec";

export class ScatterVisualization extends TabularVisualizationBase<ScatterVisualizationSettings> {

    constructor(title: string, dataSourceItem: DataSourceItem) {
        super(title, dataSourceItem)
        this.settings = new ScatterVisualizationSettings();
        this.chartType = ChartType.Scatter;
    }

    @JsonProperty("VisualizationDataSpec", { type: ScatterVisualizationDataSpec })
    private visualizationDataSpec: ScatterVisualizationDataSpec = new ScatterVisualizationDataSpec();

    public get labels(): DimensionColumn[] {
        return this.visualizationDataSpec.rows;
    }
    public set labels(value: DimensionColumn[]) {
        this.visualizationDataSpec.rows = value;
    }

    public get xAxes(): MeasureColumn[] {
        return this.visualizationDataSpec.xAxis;
    }
    public set xAxes(value: MeasureColumn[]) {
        this.visualizationDataSpec.xAxis = value;
    }

    public get yAxes(): MeasureColumn[] {
        return this.visualizationDataSpec.yAxis;
    }
    public set yAxes(value: MeasureColumn[]) {
        this.visualizationDataSpec.yAxis = value;
    }

    setXAxis(field: string | NumberDataField): this {
        this.xAxes = ColumnUtilities.createMeasureColumns(field);
        return this;
    }

    setXAxes(fields: (string | NumberDataField)[]): this {
        this.xAxes = ColumnUtilities.createMeasureColumns(...fields);
        return this;
    }

    setYAxis(field: string | NumberDataField): this {
        this.yAxes = ColumnUtilities.createMeasureColumns(field);
        return this;
    }

    setYAxes(fields: (string | NumberDataField)[]): this {
        this.yAxes = ColumnUtilities.createMeasureColumns(...fields);
        return this;
    }

    setLabel(field: string | DimensionDataField): this {
        this.labels = ColumnUtilities.createDimensionColumns(field);
        return this;
    }

    setLabels(...fields: (string | DimensionDataField)[]): this {
        this.labels = ColumnUtilities.createDimensionColumns(...fields);
        return this;
    }

    configureSettings(callback: (settings: ScatterVisualizationSettings) => void): this {
        callback(this.settings);
        return this;
    }
}