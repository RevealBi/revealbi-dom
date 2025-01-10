import { DataSource } from "../DataSource";
import { DataSourceItem } from "../DataSourceItem";
import { MongoDbDataSource } from "../DataSources";
import { IProcessDataOnServer } from "../Interfaces/IProcessDataOnServer";


export class MongoDbDataSourceItem extends DataSourceItem implements IProcessDataOnServer {
    constructor(title: string, dataSource: DataSource) {
        super(title, dataSource);
        this.processDataOnServer = true;
    }

    get collection(): string {
        return this.properties["Collection"];
    }

    set collection(value: string) {
        this.properties["Collection"] = value;
    }

    get processDataOnServer(): boolean {
        return this.properties["ServerAggregation"];
    }

    set processDataOnServer(value: boolean) {
        this.properties["ServerAggregation"] = value;
    }

    protected override createDataSourceInstance(dataSource: DataSource): DataSource {
        return this.create(MongoDbDataSource, dataSource);
    }
}
