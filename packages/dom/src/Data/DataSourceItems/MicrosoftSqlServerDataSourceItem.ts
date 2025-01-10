import { DataSource } from "../DataSource";
import { ProcedureDataSourceItem } from "../ProcedureDataSourceItem";
import { MicrosoftSqlServerDataSource } from "../DataSources";
import { IProcessDataOnServer } from "../Interfaces/IProcessDataOnServer";

export class MicrosoftSqlServerDataSourceItem extends ProcedureDataSourceItem implements IProcessDataOnServer {

    constructor(title: string);
    constructor(title: string, table: string);
    constructor(title: string, table: string, dataSource: DataSource);
    constructor(title: string, dataSource: DataSource);
    constructor(title: string, tableOrDataSource?: string | DataSource, dataSource?: DataSource) 
    {
        if (typeof tableOrDataSource === 'string') {
            super(title, dataSource);
            this.table = tableOrDataSource;
        } else {
            super(title, tableOrDataSource);
        }

        this.processDataOnServer = true;
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
