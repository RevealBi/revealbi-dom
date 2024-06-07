import { DataSourceProvider } from "../../Core/Constants/DataSourceProvider";
import { IField } from "../../Visualizations";
import { DataSource } from "../DataSource";
import { DataSourceItem } from "../DataSourceItem";


export class SqlServerBuilder {
    _dataSource: DataSource = new DataSource(); //data source
    _dataSourceItem: DataSourceItem = new DataSourceItem(); //data source item that points to the data source

    constructor(host: string, database: string, table: string) {
        this._dataSource.provider = DataSourceProvider.MicrosoftSqlServer;

        this._dataSourceItem.dataSource = this._dataSource;
        this._dataSourceItem.dataSourceId = this._dataSource.id;

        this.setHost(host);
        this.setDatabase(database);
        this.setTable(table);
        this.setSchema("dbo");
    }

    setHost(host: string): SqlServerBuilder {
        this._dataSource.properties!["Host"] = host;
        return this;
    }

    setDatabase(database: string): SqlServerBuilder {
        this._dataSource.properties!["Database"] = database;
        this._dataSourceItem.properties!["Database"] = database;
        return this;
    }

    setFields(fields: IField[]): SqlServerBuilder {
        this._dataSourceItem.fields = [...fields];
        return this;
    }

    setTable(table: string): SqlServerBuilder {
        this._dataSource.properties!["Table"] = table;
        return this;
    }

    setSchema(schema: string): SqlServerBuilder {
        this._dataSource.properties!["Schema"] = schema;
        return this;
    }

    setTitle(title: string): SqlServerBuilder {
        this._dataSource.title = title;
        this._dataSourceItem.title = title;
        return this;
    }

    setSubtitle(subtitle: string): SqlServerBuilder {
        this._dataSource.subtitle = subtitle;
        this._dataSourceItem.subtitle = subtitle;
        return this;
    }

    build(): DataSourceItem {
        if (!this._dataSourceItem.fields || this._dataSourceItem.fields.length === 0) {
            throw new Error("You must provide the field definitions for the data source item. Call the setFields function and provide the fields.");
        }
        return this._dataSourceItem;
    }
}