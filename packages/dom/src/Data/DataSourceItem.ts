import { SchemaTypeNames } from "../Core/Constants/SchemaTypeNames";
import { Guid } from "../Core/Guid";
import { SchemaType } from "../Core/SchemaType";
import { JsonProperty } from "../Core/Serialization/Decorators/JsonProperty";
import { JsonRecord } from "../Core/Serialization/Interfaces/JsonRecord";
import { IField } from "../Visualizations/Interfaces/IField";
import { DataSource } from "./DataSource";

export class DataSourceItem extends SchemaType {
    private _id: string = Guid.newGuid();
    private _subtitle?: string;
    private _dataSource: DataSource | null = null;
    private _fields: IField[] = [];

    constructor(title?: string, dataSource?: DataSource) {
        super();
        this.schemaTypeName = SchemaTypeNames.DataSourceItemType;

        //if there is a title, then the end user created this DataSourceItem via the API (instead of the JSON parser)
        //only in that case, we need to create a DataSource for the new DataSourceItem
        if (title) { 
            this.initialize(dataSource ?? new DataSource, title ?? "");
        }
    }

    @JsonProperty("Id")
    get id(): string {
        return this._id;
    }
    set id(value: string) {
        this._id = value ? value : Guid.newGuid();
        if (this.resourceItem) { //if we are dealing with a resource item, set the id on the resource item to be the same
            this.resourceItem.id = this._id;
        }
    }

    @JsonProperty("Title")
    title?: string;

    @JsonProperty("Subtitle")
    get subtitle(): string | undefined {
        return this._subtitle;
    }
    set subtitle(value: string | undefined) {
        this._subtitle = value;
        if (this.resourceItem) {
            this.resourceItem.subtitle = value;
        }
    }

    @JsonProperty("DataSourceId")
    dataSourceId?: string;

    @JsonProperty("HasTabularData")
    hasTabularData: boolean = true;

    @JsonProperty("HasAsset")
    hasAsset: boolean = false;

    @JsonProperty("Properties", { type: JsonRecord })
    properties: Record<string, any> = {};

    @JsonProperty("Parameters", { type: JsonRecord })
    parameters: Record<string, any> = {};

    @JsonProperty("ResourceItem", { type: DataSourceItem })
    resourceItem?: DataSourceItem;

    IsXmla: boolean = !this.hasTabularData && !this.hasAsset;

    get fields(): IField[] {
        return this._fields;
    }
    set fields(value: IField[]) {
        this._fields = value;
        this.onFieldsPropertyChanged(this._fields);
    }

    protected onFieldsPropertyChanged(fields: IField[]) {
        // Implement logic if needed when fields change
    }

    get dataSource(): DataSource | null {
        return this._dataSource;
    }
    set dataSource(value: DataSource | null) {
        this._dataSource = value;
        this.dataSourceId = value?.id;
    }

    resourceItemDataSource?: DataSource;


    private initialize(dataSource: DataSource, title: string) {
        this.dataSource = this.createDataSourceInstance(dataSource);
        this.initializeDataSource(this.dataSource, title);
        this.initializeDataSourceItem(title);
    }

    protected createDataSourceInstance(dataSource: DataSource): DataSource {
        return dataSource;
    }

    protected initializeDataSource(dataSource: DataSource, title: string) {
        this.dataSource = dataSource;
        this.dataSourceId = dataSource.id;

        if (!dataSource.title) {
            dataSource.title = title;
        }
    }

    protected initializeDataSourceItem(title: string) {
        this.title = title;
    }

    protected create<T extends DataSource>(ctor: new () => T, dataSource: DataSource): T {
        if (dataSource instanceof ctor) {
            return dataSource as T;
        }

        const newDataSource = new ctor();
        newDataSource.id = dataSource.id;
        newDataSource.title = dataSource.title;
        newDataSource.subtitle = dataSource.subtitle;
        newDataSource.defaultRefreshRate = dataSource.defaultRefreshRate;
        return newDataSource;
    }
}
