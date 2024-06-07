import { SchemaTypeNames } from "../Core/Constants/SchemaTypeNames";
import { Guid } from "../Core/Guid";
import { SchemaType } from "../Core/SchemaType";
import { JsonProperty } from "../Core/Serialization/Decorators/JsonProperty";
import { JsonRecord } from "../Core/Serialization/Interfaces/JsonRecord";

//this class only exists because of the circular reference between DataSourceItem and the DataSourceItem.ResourceItem property which is of type DataSourceItem
//React would not function with this circular reference so we had to create a new class to represent the ResourceItem, even though it duplicates the properties on the DataSourceItem object
export class ResourceItem extends SchemaType {
    constructor() {
        super();
        this.schemaTypeName = SchemaTypeNames.DataSourceItemType;
    }

    @JsonProperty("Id")
    id: string = Guid.newGuid();

    @JsonProperty("Title")
    title?: string;

    @JsonProperty("Subtitle")
    subtitle?: string;

    @JsonProperty("DataSourceId")
    dataSourceId?: string;

    @JsonProperty("HasTabularData")
    hasTabularData: boolean = true;

    @JsonProperty("HasAsset")
    hasAsset: boolean = false;

    @JsonProperty("Properties", { type: JsonRecord })
    properties?: Record<string, any> = {};

    @JsonProperty("Parameters", { type: JsonRecord })
    parameters?: Record<string, any> = {};
}