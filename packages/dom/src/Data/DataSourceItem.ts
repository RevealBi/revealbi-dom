import { SchemaTypeNames } from "../Core/Constants/SchemaTypeNames";
import { Guid } from "../Core/Guid";
import { SchemaType } from "../Core/SchemaType";
import { JsonProperty } from "../Core/Serialization/Decorators/JsonProperty";
import { JsonRecord } from "../Core/Serialization/Interfaces/JsonRecord";
import { IField } from "../Visualizations/Interfaces/IField";
import { DataSource } from "./DataSource";
import { ResourceItem } from "./ResourceItem";

export class DataSourceItem extends SchemaType {
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

    @JsonProperty("ResourceItem", { type: ResourceItem })
    resourceItem?: ResourceItem;

    IsXmla: boolean = !this.hasTabularData && !this.hasAsset;

    fields: IField[] = [];

    dataSource?: DataSource;

    resourceItemDataSource?: DataSource;
}