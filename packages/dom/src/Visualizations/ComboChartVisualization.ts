import { JsonProperty } from "../Core/Serialization/Decorators/JsonProperty";
import { DataSourceItem } from "../Data/DataSourceItem";
import { ChartType } from "./Enums";
import { DimensionDataField, NumberDataField } from "./Primitives";
import { DimensionColumn } from "./Primitives/DimensionColumn";
import { MeasureColumn } from "./Primitives/MeasureColumn";
import { ComboChartVisualizationSettings } from "./Settings/ComboChartVisualizationSettings";
import { TabularVisualizationBase } from "./TabularVisualizationBase";
import { ColumnUtilities } from "./Utilities/ColumnUtilities";
import { CompositeChartVisualizationDataSpec } from "./VisualizationSpecs/CompositeChartVisualizationDataSpec";

export class ComboChartVisualization extends TabularVisualizationBase<ComboChartVisualizationSettings> {
    constructor(title: string, dataSourceItem: DataSourceItem) {
        super(title, dataSourceItem)
        this.settings = new ComboChartVisualizationSettings();
        this.chartType = ChartType.Combo;
    }

    @JsonProperty("VisualizationDataSpec", { type: CompositeChartVisualizationDataSpec })
    private visualizationDataSpec: CompositeChartVisualizationDataSpec = new CompositeChartVisualizationDataSpec();

    public get chart1(): MeasureColumn[] {
        return this.visualizationDataSpec.chart1;
    }
    public set chart1(value: MeasureColumn[]) {
        this.visualizationDataSpec.chart1 = value;
    }

    public get chart2(): MeasureColumn[] {
        return this.visualizationDataSpec.chart2;
    }
    public set chart2(value: MeasureColumn[]) {
        this.visualizationDataSpec.chart2 = value;
    }

    public get labels(): DimensionColumn[] {
        return this.visualizationDataSpec.rows;
    }
    public set labels(value: DimensionColumn[]) {
        this.visualizationDataSpec.rows = value;
    }

    setChart1Value(field: string | NumberDataField): this {
        this.chart1 = ColumnUtilities.createMeasureColumns(field);
        return this;
    }

    setChart1Values(...fields: (string | NumberDataField)[]): this {
        this.chart1 = ColumnUtilities.createMeasureColumns(...fields);
        return this;
    }

    setChart2Value(field: string | NumberDataField): this {
        this.chart2 = ColumnUtilities.createMeasureColumns(field);
        return this;
    }

    setChart2Values(...fields: (string | NumberDataField)[]): this {
        this.chart2 = ColumnUtilities.createMeasureColumns(...fields);
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

    configureSettings(callback: (settings: ComboChartVisualizationSettings) => void): this {
        callback(this.settings);
        return this;
    }
}