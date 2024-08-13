import { JsonProperty } from "../Core/Serialization/Decorators/JsonProperty";
import { DataSourceItem } from "../Data/DataSourceItem";
import { ChartType } from "./Enums";
import { DimensionDataField, NumberDataField } from "./Primitives";
import { DimensionColumn } from "./Primitives/DimensionColumn";
import { MeasureColumn } from "./Primitives/MeasureColumn";
import { PivotVisualizationSettings } from "./Settings/PivotVisualizationSettings";
import { Visualization } from "./Visualization";
import { ColumnUtilities } from "./Utilities/ColumnUtilities";
import { PivotVisualizationDataSpec } from "./VisualizationSpecs/PivotVisualizationDataSpec";

export class PivotVisualization extends Visualization<PivotVisualizationSettings> {

    constructor(title: string, dataSourceItem: DataSourceItem) {
        super(title, dataSourceItem)
        this.settings = new PivotVisualizationSettings();
        this.settings._visualizationDataSpec = this.visualizationDataSpec; //this is a workaround because the json schemea has this property on the VisualizationDataSpec and not on the VisualizationSettings where it belongs
        this.chartType = ChartType.Pivot;
    }

    @JsonProperty("VisualizationDataSpec", { type: PivotVisualizationDataSpec })
    private visualizationDataSpec: PivotVisualizationDataSpec = new PivotVisualizationDataSpec();

    public get columns(): DimensionColumn[] {
        return this.visualizationDataSpec.columns;
    }
    public set columns(value: DimensionColumn[]) {
        this.visualizationDataSpec.columns = value;
    }

    public get rows(): DimensionColumn[] {
        return this.visualizationDataSpec.rows;
    }
    public set rows(value: DimensionColumn[]) {
        this.visualizationDataSpec.rows = value;
    }

    public get values(): MeasureColumn[] {
        return this.visualizationDataSpec.values;
    }
    public set values(value: MeasureColumn[]) {
        this.visualizationDataSpec.values = value;
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

    setRows(fields: (string | DimensionDataField)[]): this {
        this.rows = ColumnUtilities.createDimensionColumns(...fields);
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

    configureSettings(callback: (settings: PivotVisualizationSettings) => void): this {
        callback(this.settings);
        return this;
    }
}