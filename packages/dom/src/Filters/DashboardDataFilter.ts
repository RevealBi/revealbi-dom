import { SchemaTypeNames } from "../Core/Constants/SchemaTypeNames";
import { dataSpecConverter } from "../Core/Serialization/Converters/DataSpecConverter";
import { JsonProperty } from "../Core/Serialization/Decorators/JsonProperty";
import { DataSourceItem } from "../Data/DataSourceItem";
import { DataDefinitionBase } from "../Visualizations/DataDefinitions/DataDefinitionBase";
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
            if (this.dataSpec instanceof TabularDataDefinition) {
                this.dataSpec.fields = [...dataSourceItem.fields]; // copy fields instead of reference
            }
        }        
    }

    @JsonProperty("DataSpec", { converter: dataSpecConverter })
    readonly dataSpec!: DataDefinitionBase;

    @JsonProperty("SelectedFieldName")
    selectedFieldName?: string;
}