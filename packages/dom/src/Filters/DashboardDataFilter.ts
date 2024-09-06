import { SchemaTypeNames } from "../Core/Constants/SchemaTypeNames";
import { JsonProperty } from "../Core/Serialization/Decorators/JsonProperty";
import { CloneUtility } from "../Core/Utilities/CloneUtility";
import { DataSourceItem } from "../Data/DataSourceItem";
import { TabularDataDefinition } from "../Visualizations/DataDefinitions/TabularDataDefinition";
import { DashboardDataFilterBase } from "./DashboardDataFilterBase";
import { FilterItem } from "./FilterItem";

export class DashboardDataFilter extends DashboardDataFilterBase {
    constructor()
    constructor(fieldName: string, dataSourceItem: DataSourceItem)
    constructor(fieldName: string, title: string, dataSourceItem: DataSourceItem)
    constructor(fieldName?: string, title?: string | DataSourceItem, dataSourceItem?: DataSourceItem) {
        super();
        this.schemaTypeName = SchemaTypeNames.TabularGlobalFilterType;

        // Handle cases where `title` is actually a DataSourceItem (when two parameters are passed)
        if (title instanceof DataSourceItem) {
            dataSourceItem = title;
            title = fieldName;
        }

        this.fieldName = fieldName || "";
        this.title = title || this.fieldName;

        if (dataSourceItem) {
            this.dataDefinition.dataSourceItem = dataSourceItem;
            if (this.dataDefinition instanceof TabularDataDefinition) {
                this.dataDefinition.fields = dataSourceItem.fields.map(field => CloneUtility.clone(field));
            }
        }        
    }

    @JsonProperty("DataSpec", { type: TabularDataDefinition })
    private readonly dataDefinition: TabularDataDefinition = new TabularDataDefinition();

    @JsonProperty("SelectedFieldName")
    fieldName: string = "";

    public selectValues(...values: any[]): void {
        this.selectedItems = [];
        values.forEach(value => {
            this.selectedItems.push(new FilterItem(this.fieldName, value));
        });
    }
}