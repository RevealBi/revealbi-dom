import { SchemaTypeNames } from "../Core/Constants/SchemaTypeNames";
import { JsonProperty } from "../Core/Serialization/Decorators/JsonProperty";
import { DataSourceItem } from "../Data/DataSourceItem";
import { TabularDataDefinition } from "../Visualizations/DataDefinitions/TabularDataDefinition";
import { DashboardDataFilterBase } from "./DashboardDataFilterBase";

export class DashboardDataFilter extends DashboardDataFilterBase {
    constructor()
    constructor(dataSourceItem: DataSourceItem)
    constructor(dataSourceItem?: DataSourceItem) {
        super();
        this.schemaTypeName = SchemaTypeNames.TabularGlobalFilterType;

        if (dataSourceItem) {
            this.dataSpec.dataSourceItem = dataSourceItem;
            this.dataSpec.fields = dataSourceItem.fields; //todo: copy fields instead of reference
        }        
    }

    @JsonProperty("DataSpec")
    readonly dataSpec: TabularDataDefinition = new TabularDataDefinition();

    @JsonProperty("SelectedFieldName")
    selectedFieldName?: string;
}