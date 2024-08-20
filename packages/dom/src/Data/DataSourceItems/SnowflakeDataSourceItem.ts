import { DataSource } from "../DataSource";
import { SnowflakeDataSource } from "../DataSources";
import { IProcessDataOnServer } from "../Interfaces/IProcessDataOnServer";
import { SchemaDataSourceItem } from "../SchemaDataSourceItem";


export class SnowflakeDataSourceItem extends SchemaDataSourceItem implements IProcessDataOnServer {
    constructor(title: string, dataSource: SnowflakeDataSource | DataSource) {
        super(title, dataSource);
    }

    get processDataOnServer(): boolean {
        return this.properties["ServerAggregation"];
    }

    set processDataOnServer(value: boolean) {
        this.properties["ServerAggregation"] = value;
    }

    protected override createDataSourceInstance(dataSource: DataSource): DataSource {
        return this.create(SnowflakeDataSource, dataSource);
    }
}
