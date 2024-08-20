import { DataSource } from "../DataSource";
import { MicrosoftAzureSynapseAnalyticsDataSource } from "../DataSources";
import { MicrosoftSqlServerDataSourceItem } from "./MicrosoftSqlServerDataSourceItem";


export class MicrosoftAzureSynapseAnalyticsDataSourceItem extends MicrosoftSqlServerDataSourceItem {
    constructor(title: string, dataSource: DataSource) {
        super(title, dataSource);
    }

    protected override createDataSourceInstance(dataSource: DataSource): DataSource {
        return this.create(MicrosoftAzureSynapseAnalyticsDataSource, dataSource);
    }
}
