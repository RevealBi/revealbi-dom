import { JsonProperty } from "../Core/Serialization/Decorators/JsonProperty";
import { DataSourceItem } from "../Data/DataSourceItem";
import { ChartType } from "./Enums";
import { DateDataField, DimensionDataField, NumberDataField } from "./Primitives";
import { DimensionColumn } from "./Primitives/DimensionColumn";
import { MeasureColumn } from "./Primitives/MeasureColumn";
import { KpiTargetVisualizationSettings } from "./Settings/KpiTargetVisualizationSettings";
import { TabularVisualizationBase } from "./TabularVisualizationBase";
import { ColumnUtilities } from "./Utilities/ColumnUtilities";
import { IndicatorTargetVisualizationDataSpec } from "./VisualizationSpecs/IndicatorTargetVisualizationDataSpec";

export class KpiTargetVisualization extends TabularVisualizationBase<KpiTargetVisualizationSettings> {

    constructor(title: string, dataSourceItem: DataSourceItem) {
        super(title, dataSourceItem)
        this.settings = new KpiTargetVisualizationSettings();
        this.settings._visualizationDataSpec = this.visualizationDataSpec; //todo: pass this into the settings ctor
        this.chartType = ChartType.KpiTarget;
    }

    @JsonProperty("VisualizationDataSpec", { type: IndicatorTargetVisualizationDataSpec })
    private visualizationDataSpec: IndicatorTargetVisualizationDataSpec = new IndicatorTargetVisualizationDataSpec();

    public get date(): DimensionColumn | undefined {
        return this.visualizationDataSpec.date;
    }
    public set date(value: DimensionColumn | undefined) {
        this.visualizationDataSpec.date = value;
    }

    public get values(): MeasureColumn[] {
        return this.visualizationDataSpec.value;
    }
    public set values(value: MeasureColumn[]) {
        this.visualizationDataSpec.value = value;
    }

    public get categories(): DimensionColumn[] {
        return this.visualizationDataSpec.rows;
    }
    public set categories(value: DimensionColumn[]) {
        this.visualizationDataSpec.rows = value;
    }

    public get targets(): MeasureColumn[] {
        return this.visualizationDataSpec.target;
    }
    public set targets(value: MeasureColumn[]) {
        this.visualizationDataSpec.target = value;
    }

    setCategories(fields: (string | DimensionDataField)[]): this {            
        this.categories = ColumnUtilities.createDimensionColumns(...fields);
        return this;
    }

    setDate(field: string | DateDataField): this {
        this.date = ColumnUtilities.createDateDimensionColumn(field);
        return this;
    }

    setTarget(field: string | NumberDataField): this {
        this.targets = ColumnUtilities.createMeasureColumns(field);
        return this;
    }

    setTargets(...fields: (string | NumberDataField)[]): this {
        this.targets = ColumnUtilities.createMeasureColumns(...fields);
        return this;
    }

    setValue(field: string | NumberDataField): this {
        this.values = ColumnUtilities.createMeasureColumns(field);
        return this;
    }

    setValues(...fields: (string | NumberDataField)[]): this {
        this.values = ColumnUtilities.createMeasureColumns(...fields);
        return this;
    }

    configureSettings(callback: (settings: KpiTargetVisualizationSettings) => void): this {
        callback(this.settings);
        return this;
    }
}