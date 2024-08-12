import { JsonProperty } from "../Core/Serialization/Decorators/JsonProperty";
import { DataSourceItem } from "../Data";
import { ChartType } from "./Enums";
import { DimensionColumn, MeasureColumn, DimensionDataField, NumberDataField } from "./Primitives";
import { CustomVisualizationSettings } from "./Settings";
import { Visualization } from "./Visualization";
import { ColumnUtilities } from "./Utilities/ColumnUtilities";
import { PivotVisualizationDataSpec } from "./VisualizationSpecs/PivotVisualizationDataSpec";


export class CustomVisualization extends Visualization<CustomVisualizationSettings> {

    constructor(title: string, dataSourceItem: DataSourceItem) {
        super(title, dataSourceItem)
        this.settings = new CustomVisualizationSettings();
        this.chartType = ChartType.Custom;
    }

    @JsonProperty("VisualizationDataSpec", { type: PivotVisualizationDataSpec })
    private visualizationDataSpec: PivotVisualizationDataSpec = new PivotVisualizationDataSpec();

    public get rows(): DimensionColumn[] {
        return this.visualizationDataSpec.rows;
    }
    public set rows(value: DimensionColumn[]) {
        this.visualizationDataSpec.rows = value;
    }

    public get columns(): DimensionColumn[] {
        return this.visualizationDataSpec.columns;
    }
    public set columns(value: DimensionColumn[]) {
        this.visualizationDataSpec.columns = value;
    }

    public get values(): MeasureColumn[] {
        return this.visualizationDataSpec.values;
    }
    public set values(value: MeasureColumn[]) {
        this.visualizationDataSpec.values = value;
    }    

    public get url() : string | undefined {
        return this.settings.url;
    }
    public set url(value : string | undefined) {
        this.settings.url = value;
    }

    setColumn(field: string | DimensionDataField): this {
        this.columns = ColumnUtilities.createDimensionColumns(field);
        return this;
    }

    setColumns(fields: (string | DimensionDataField)[]): this {
        this.columns = ColumnUtilities.createDimensionColumns(...fields);
        return this;
    }

    setRow(field: string | DimensionDataField): this {
        this.rows = ColumnUtilities.createDimensionColumns(field);
        return this;
    }

    setRows(...fields: (string | DimensionDataField)[]): this {
        this.rows = ColumnUtilities.createDimensionColumns(...fields);
        return this;
    }

    setUrl(url:string): this {
        this.url = url;
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
}