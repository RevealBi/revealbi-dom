import { DataSource } from "../DataSource";
import { DuckDbDataSource } from "../DataSources";
import { IProcessDataOnServer } from "../Interfaces/IProcessDataOnServer";
import { ProcedureDataSourceItem } from "../ProcedureDataSourceItem";

export class DuckDbDataSourceItem extends ProcedureDataSourceItem implements IProcessDataOnServer {
    constructor(title: string, dataSource: DataSource) {
        super(title, dataSource);
        this.processDataOnServer = true;
    }

    get schema(): string {
        return this.properties["Schema"];
    }

    set schema(value: string) {
        this.properties["Schema"] = value;
    }

    get processDataOnServer(): boolean {
        return this.properties["ServerAggregation"];
    }

    set processDataOnServer(value: boolean) {
        this.properties["ServerAggregation"] = value;
    }

    protected override createDataSourceInstance(dataSource: DataSource): DataSource {
        return this.create(DuckDbDataSource, dataSource);
    }
}
