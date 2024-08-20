import { DataSource } from "../DataSource";
import { AmazonAthenaDataSource } from "../DataSources";
import { TableDataSourceItem } from "../TableDataSourceItem";

export class AmazonAthenaDataSourceItem extends TableDataSourceItem {
    constructor(title: string, dataSource: DataSource) {
        super(title, dataSource);
    }

    protected override createDataSourceInstance(dataSource: DataSource): DataSource {
        return this.create(AmazonAthenaDataSource, dataSource);
    }
}
