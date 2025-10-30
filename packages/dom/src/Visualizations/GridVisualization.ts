import { JsonProperty } from "../Core/Serialization/Decorators/JsonProperty";
import { DataSourceItem } from "../Data/DataSourceItem";
import { ChartType } from "./Enums";
import { TabularColumn } from "./Primitives/TabularColumn";
import { GridVisualizationSettings } from "./Settings/GridVisualizationSettings";
import { Visualization } from "./Visualization";
import { ColumnUtilities } from "./Utilities/ColumnUtilities";
import { GridVisualizationDataSpec } from "./VisualizationSpecs/GridVisualizationDataSpec";
import { IVisualization } from "./Interfaces/IVisualization";
import { VisualizationConverter, GridConversionOptions } from "../Core/Utilities/VisualizationConverter";

export class GridVisualization extends Visualization<GridVisualizationSettings> {

    constructor(title: string, dataSourceItem: DataSourceItem) {
        super(title, dataSourceItem)
        this.settings = new GridVisualizationSettings();
        this.chartType = ChartType.Grid;
    }

    /**
     * Converts a visualization to a GridVisualization.
     * @param sourceViz The source visualization to convert.
     * @param options Optional conversion options.
     * @returns A new GridVisualization instance with the converted data, or null if the visualization cannot be converted (e.g., TextBox, Custom, Image, or Grid types).
     * @example
     * // Convert with only visualization fields
     * const grid = GridVisualization.from(barChart);
     * 
     * // Convert with all data source fields
     * const grid = GridVisualization.from(barChart, { includeAllFields: true });
     */
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