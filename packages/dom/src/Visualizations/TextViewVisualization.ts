import { JsonProperty } from "../Core/Serialization/Decorators/JsonProperty";
import { DataSourceItem } from "../Data/DataSourceItem";
import { ChartType } from "./Enums";
import { TabularColumn } from "./Primitives/TabularColumn";
import { SingleRowVisualizationSettings } from "./Settings/SingleRowVisualizationSettings";
import { TabularVisualizationBase } from "./TabularVisualizationBase";
import { ColumnUtilities } from "./Utilities/ColumnUtilities";
import { GridVisualizationDataSpec } from "./VisualizationSpecs/GridVisualizationDataSpec";

export class TextViewVisualization extends TabularVisualizationBase<SingleRowVisualizationSettings> {

    constructor(title: string, dataSourceItem: DataSourceItem) {
        super(title, dataSourceItem)
        this.settings = new SingleRowVisualizationSettings();
        this.chartType = ChartType.TextView;
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
}