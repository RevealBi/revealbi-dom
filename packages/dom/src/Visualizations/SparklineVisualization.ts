import { JsonProperty } from "../Core/Serialization/Decorators/JsonProperty";
import { DataSourceItem } from "../Data/DataSourceItem";
import { ChartType } from "./Enums";
import { DateDataField, DimensionDataField, NumberDataField } from "./Primitives";
import { DimensionColumn } from "./Primitives/DimensionColumn";
import { MeasureColumn } from "./Primitives/MeasureColumn";
import { SparklineVisualizationSettings } from "./Settings/SparklineVisualizationSettings";
import { TabularVisualizationBase } from "./TabularVisualizationBase";
import { ColumnUtilities } from "./Utilities/ColumnUtilities";
import { SparklineVisualizationDataSpec } from "./VisualizationSpecs/SparklineVisualizationDataSpec";

export class SparklineVisualization extends TabularVisualizationBase<SparklineVisualizationSettings> {
    constructor(title: string, dataSourceItem: DataSourceItem) {
        super(title, dataSourceItem)
        this.settings = new SparklineVisualizationSettings();
        this.settings._visualizationDataSpec = this.visualizationDataSpec; //todo: pass this to the setting ctor
        this.chartType = ChartType.Sparkline;
    }

    @JsonProperty("VisualizationDataSpec", { type: SparklineVisualizationDataSpec })
    private visualizationDataSpec: SparklineVisualizationDataSpec = new SparklineVisualizationDataSpec();

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

    setCategory(field: string | DimensionDataField): this {            
        this.categories = ColumnUtilities.createDimensionColumns(field);
        return this;
    }

    setCategories(fields: (string | DimensionDataField)[]): this {            
        this.categories = ColumnUtilities.createDimensionColumns(...fields);
        return this;
    }

    setDate(field: string | DateDataField): this {
        this.date = ColumnUtilities.createDateDimensionColumn(field);
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

    configureSettings(callback: (settings: SparklineVisualizationSettings) => void): this {
        callback(this.settings);
        return this;
    }
}