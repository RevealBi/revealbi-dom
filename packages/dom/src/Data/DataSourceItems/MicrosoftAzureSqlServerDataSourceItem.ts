import { DataSource } from "../DataSource";
import { MicrosoftAzureSqlServerDataSource } from "../DataSources";
import { MicrosoftSqlServerDataSourceItem } from "./MicrosoftSqlServerDataSourceItem";


export class MicrosoftAzureSqlServerDataSourceItem extends MicrosoftSqlServerDataSourceItem {
    constructor(title: string, dataSource: DataSource) {
        super(title, dataSource);
    }

    protected override createDataSourceInstance(dataSource: DataSource): DataSource {
        return this.create(MicrosoftAzureSqlServerDataSource, dataSource);
    }
}
