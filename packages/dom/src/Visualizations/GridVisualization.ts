import { JsonProperty } from "../Core/Serialization/Decorators/JsonProperty";
import { DataSourceItem } from "../Data/DataSourceItem";
import { ChartType } from "./Enums";
import { TabularColumn } from "./Primitives/TabularColumn";
import { GridVisualizationSettings } from "./Settings/GridVisualizationSettings";
import { Visualization } from "./Visualization";
import { ColumnUtilities } from "./Utilities/ColumnUtilities";
import { GridVisualizationDataSpec } from "./VisualizationSpecs/GridVisualizationDataSpec";
import { IVisualization } from "./Interfaces/IVisualization";
import { VisualizationConverter, GridConversionOptions } from "./Converters/VisualizationConverter";

export class GridVisualization extends Visualization<GridVisualizationSettings> {

    constructor(title: string, dataSourceItem: DataSourceItem) {
        super(title, dataSourceItem)
        this.settings = new GridVisualizationSettings();
        this.chartType = ChartType.Grid;
    }

    static from(sourceViz: IVisualization, options?: GridConversionOptions): GridVisualization | null {
        return VisualizationConverter.toGrid(sourceViz, options);
    }

    @JsonProperty("VisualizationDataSpec", { type: GridVisualizationDataSpec })
    private visualizationDataSpec: GridVisualizationDataSpec = new GridVisualizationDataSpec();

    public get columns(): TabularColumn[] {
        return this.visualizationDataSpec.columns;
    }
    public set columns(value: TabularColumn[]) {
        this.visualizationDataSpec.columns = value;
    }

    setColumn(field: string): this {
        this.columns = ColumnUtilities.createTabularColumns(field);
        return this;
    }

    setColumns(...fields: string[]): this {
        this.columns = ColumnUtilities.createTabularColumns(...fields);
        return this;
    }

    configureSettings(callback: (settings: GridVisualizationSettings) => void): this {
        callback(this.settings);
        return this;
    }
}