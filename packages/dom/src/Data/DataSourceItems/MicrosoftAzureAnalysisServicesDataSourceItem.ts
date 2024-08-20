import { DataSource } from "../DataSource";
import { DataSourceItem } from "../DataSourceItem";


export class MicrosoftAzureAnalysisServicesDataSourceItem extends DataSourceItem {
    constructor(title: string, dataSource: DataSource) {
        super(title, dataSource);
        this.hasTabularData = false;
    }
}
