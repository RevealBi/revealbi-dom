import { DataSourceItem } from "../Data/DataSourceItem";
import { VisualizationFilter } from "../Filters/VisualizationFilter";
import { TabularDataDefinition } from "./DataDefinitions/TabularDataDefinition";
import { VisualizationSettings } from "./Settings/VisualizationSettings";
import { Visualization } from "./Visualization";

export abstract class TabularVisualizationBase<TSettings extends VisualizationSettings> extends Visualization<TSettings, TabularDataDefinition> {

    constructor(title: string, dataSourceItem: DataSourceItem){
        super(title);
        this.dataDefinition = new TabularDataDefinition();
        this.dataDefinition.dataSourceItem = dataSourceItem;
        this.dataDefinition.fields = dataSourceItem?.fields; //todo: copy fields instead of reference
    }
    
    get filters(): VisualizationFilter[] {
        return this.dataDefinition.quickFilters;
    }
}