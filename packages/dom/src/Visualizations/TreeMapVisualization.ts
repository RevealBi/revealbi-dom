import { JsonProperty } from "../Core/Serialization/Decorators/JsonProperty";
import { DataSourceItem } from "../Data/DataSourceItem";
import { ChartType } from "./Enums";
import { DimensionDataField, NumberDataField } from "./Primitives";
import { DimensionColumn } from "./Primitives/DimensionColumn";
import { MeasureColumn } from "./Primitives/MeasureColumn";
import { TreeMapVisualizationSettings } from "./Settings/TreeMapVisualizationSettings";
import { ColumnUtilities } from "./Utilities/ColumnUtilities";
import { Visualization } from "./Visualization";
import { TreeMapVisualizationDataSpec } from "./VisualizationSpecs/TreeMapVisualizationDataSpec";

export class TreeMapVisualization extends Visualization<TreeMapVisualizationSettings> {
    constructor(title: string, dataSourceItem: DataSourceItem) {
        super(title, dataSourceItem)
        this.settings = new TreeMapVisualizationSettings();
        this.chartType = ChartType.TreeMap;
    }

    @JsonProperty("VisualizationDataSpec", { type: TreeMapVisualizationDataSpec })
    private visualizationDataSpec: TreeMapVisualizationDataSpec = new TreeMapVisualizationDataSpec();

    public get labels(): DimensionColumn[] {
        return this.visualizationDataSpec.rows;
    }
    public set labels(value: DimensionColumn[]) {
        this.visualizationDataSpec.rows = value;
    }

    public get values(): MeasureColumn[] {
        return this.visualizationDataSpec.value;
    }
    public set values(value: MeasureColumn[]) {
        this.visualizationDataSpec.value = value;
    }

    setLabel(field: string | DimensionDataField): this {
        this.labels = ColumnUtilities.createDimensionColumns(field);
        return this;
    }

    setLabels(...fields: (string | DimensionDataField)[]): this {
        this.labels = ColumnUtilities.createDimensionColumns(...fields);
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

    configureSettings(callback: (settings: TreeMapVisualizationSettings) => void): this {
        callback(this.settings);
        return this;
    }
}