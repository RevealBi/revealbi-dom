import { JsonProperty } from "../Core/Serialization/Decorators/JsonProperty";
import { DataSourceItem } from "../Data/DataSourceItem";
import { ChartType } from "./Enums";
import { DateDataField, DimensionColumn, DimensionDataField, MeasureColumn, NumberDataField } from "./Primitives";
import { TimeSeriesVisualizationSettings } from "./Settings/TimeSeriesVisualizationSettings";
import { ColumnUtilities } from "./Utilities/ColumnUtilities";
import { Visualization } from "./Visualization";
import { TimeSeriesVisualizationDataSpec } from "./VisualizationSpecs/TimeSeriesVisualizationDataSpec";

export class TimeSeriesVisualization extends Visualization<TimeSeriesVisualizationSettings> {
    
    constructor(title: string, dataSourceItem: DataSourceItem) {
        super(title, dataSourceItem)
        this.settings = new TimeSeriesVisualizationSettings();
        this.chartType = ChartType.TimeSeries;
    }

    @JsonProperty("VisualizationDataSpec", { type: TimeSeriesVisualizationDataSpec })
    private visualizationDataSpec: TimeSeriesVisualizationDataSpec = new TimeSeriesVisualizationDataSpec();

    public get date(): DimensionColumn {
        return this.visualizationDataSpec?.rows?.[0] || undefined;
    }
    public set date(value: DimensionColumn) {
        this.visualizationDataSpec.rows = [ value ];
    }

    get category(): DimensionColumn | undefined {
        return this.visualizationDataSpec.category;
    }
    set category(value: DimensionColumn | undefined) {
        this.visualizationDataSpec.category = value;
    }

    public get values(): MeasureColumn[] {
        return this.visualizationDataSpec.values;
    }
    public set values(value: MeasureColumn[]) {
        this.visualizationDataSpec.values = value;
    }

    setCategory(field: string | DimensionDataField): this {            
        this.category = ColumnUtilities.createDimensionColumn(field);
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

    configureSettings(callback: (settings: TimeSeriesVisualizationSettings) => void): this {
        callback(this.settings);
        return this;
    }
}