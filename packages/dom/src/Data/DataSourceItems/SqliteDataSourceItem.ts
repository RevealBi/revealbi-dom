import { DataSource } from "../DataSource";
import { SqliteDataSource } from "../DataSources";
import { TableDataSourceItem } from "../TableDataSourceItem";

export class SqliteDataSourceItem extends TableDataSourceItem {
    constructor(title: string, dataSource: DataSource) {
        super(title, dataSource);
    }

    get disableDateTypeInference(): boolean {
        return this.properties["DisableDateTypeInference"];
    }

    set disableDateTypeInference(value: boolean) {
        this.properties["DisableDateTypeInference"] = value;
    }

    protected override createDataSourceInstance(dataSource: DataSource): DataSource {
        return this.create(SqliteDataSource, dataSource);
    }
}
