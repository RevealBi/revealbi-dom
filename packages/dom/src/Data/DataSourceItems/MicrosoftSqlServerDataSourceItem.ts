import { DataSource } from "../DataSource";
import { ProcedureDataSourceItem } from "../ProcedureDataSourceItem";
import { MicrosoftSqlServerDataSource } from "../DataSources";
import { IProcessDataOnServer } from "../Interfaces/IProcessDataOnServer";

export class MicrosoftSqlServerDataSourceItem extends ProcedureDataSourceItem implements IProcessDataOnServer {

    constructor(title: string, table?: string, dataSource?: MicrosoftSqlServerDataSource | DataSource) {
        super(title, dataSource as DataSource);
        if (table) this.table = table;
    }

    get processDataOnServer(): boolean {
        return this.properties["ServerAggregation"];
    }

    set processDataOnServer(value: boolean) {
        this.properties["ServerAggregation"] = value;
    }

    protected override createDataSourceInstance(dataSource: DataSource): DataSource {
        return this.create(MicrosoftSqlServerDataSource, dataSource);
    }
}
