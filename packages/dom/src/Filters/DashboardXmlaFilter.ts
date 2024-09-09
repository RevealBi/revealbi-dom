import { SchemaTypeNames } from "../Core/Constants/SchemaTypeNames";
import { JsonProperty } from "../Core/Serialization/Decorators/JsonProperty";
import { DataSourceItem } from "../Data";
import { DashboardDataFilterBase } from "./DashboardDataFilterBase";


export class DashboardXmlaFilter extends DashboardDataFilterBase {

    constructor();
    constructor(dataSourceItem: DataSourceItem);
    constructor(dataSourceItem?: DataSourceItem) {
        super();
        this.schemaTypeName = SchemaTypeNames.XmlaGlobalFilterType;
        this.dataSourceItem = dataSourceItem;
    }

    @JsonProperty("SataSourceItem")
    private dataSourceItem?: DataSourceItem;

    @JsonProperty("DimensionUniqueName")
    dimensionUniqueName?: string;

    @JsonProperty("HierarchyUniqueName")
    hierarchyUniqueName?: string;

    @JsonProperty("LevelUniqueName")
    levelUniqueName?: string;

    @JsonProperty("MeasureUniqueName")
    measureUniqueName?: string;

    @JsonProperty("Expiration")
    expiration?: number;
}
