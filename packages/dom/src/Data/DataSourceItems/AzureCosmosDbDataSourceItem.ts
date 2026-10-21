import { AzureCosmosDbDataSource } from "../DataSources";
import { DataSource } from "../DataSource";
import { DatabaseDataSourceItem } from "../DatabaseDataSourceItem";
import { IProcessDataOnServer } from "../Interfaces/IProcessDataOnServer";

export class AzureCosmosDbDataSourceItem extends DatabaseDataSourceItem implements IProcessDataOnServer {
    constructor(title: string, dataSource: DataSource) {
        super(title, dataSource);
        this.processDataOnServer = true;
    }

    // The SDK stores the Cosmos DB container under the "Table" key.
    get container(): string {
        return this.table;
    }

    set container(value: string) {
        this.table = value;
    }

    get processDataOnServer(): boolean {
        return this.properties["ServerAggregation"];
    }

    set processDataOnServer(value: boolean) {
        this.properties["ServerAggregation"] = value;
    }

    protected override createDataSourceInstance(dataSource: DataSource): DataSource {
        return this.create(AzureCosmosDbDataSource, dataSource);
    }
}
