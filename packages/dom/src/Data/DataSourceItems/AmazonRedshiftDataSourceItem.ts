import { DataSource } from "../DataSource";
import { AmazonRedshiftDataSource } from "../DataSources";
import { FunctionDataSourceItem } from "../FunctionDataSourceItem";


export class AmazonRedshiftDataSourceItem extends FunctionDataSourceItem {
    constructor(title: string, dataSource: DataSource) {
        super(title, dataSource);
    }

    protected override createDataSourceInstance(dataSource: DataSource): DataSource {
        return this.create(AmazonRedshiftDataSource, dataSource);
    }
}
