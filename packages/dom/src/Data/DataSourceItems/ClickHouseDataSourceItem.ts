import { DataSource } from "../DataSource";
import { ClickHouseDataSource } from "../DataSources";
import { DatabaseDataSourceItem } from "../DatabaseDataSourceItem";

export class ClickHouseDataSourceItem extends DatabaseDataSourceItem {
    constructor(title: string, dataSource: DataSource) {
        super(title, dataSource);
    }

    protected override createDataSourceInstance(dataSource: DataSource): DataSource {
        return this.create(ClickHouseDataSource, dataSource);
    }
}
