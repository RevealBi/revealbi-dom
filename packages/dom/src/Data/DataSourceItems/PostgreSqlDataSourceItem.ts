import { DataSource } from "../DataSource";
import { PostgreSqlDataSource } from "../DataSources";
import { FunctionDataSourceItem } from "../FunctionDataSourceItem";
import { IProcessDataOnServer } from "../Interfaces/IProcessDataOnServer";


export class PostgreSqlDataSourceItem extends FunctionDataSourceItem implements IProcessDataOnServer {
    constructor(title: string, dataSource: DataSource) {
        super(title, dataSource);
        this.processDataOnServer = true;
    }

    get processDataOnServer(): boolean {
        return this.properties["ServerAggregation"];
    }

    set processDataOnServer(value: boolean) {
        this.properties["ServerAggregation"] = value;
    }

    protected override createDataSourceInstance(dataSource: DataSource): DataSource {
        return this.create(PostgreSqlDataSource, dataSource);
    }
}
