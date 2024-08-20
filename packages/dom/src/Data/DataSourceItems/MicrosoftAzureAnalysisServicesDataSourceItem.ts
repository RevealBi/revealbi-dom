import { DataSource } from "../DataSource";
import { DataSourceItem } from "../DataSourceItem";
import { MicrosoftAzureAnalysisServicesDataSource } from "../DataSources";


export class MicrosoftAzureAnalysisServicesDataSourceItem extends DataSourceItem {
    constructor(title: string, dataSource: DataSource) {
        super(title, dataSource);
        this.hasTabularData = false;
    }

    protected override createDataSourceInstance(dataSource: DataSource): DataSource {
        return this.create(MicrosoftAzureAnalysisServicesDataSource, dataSource);
    }
}
