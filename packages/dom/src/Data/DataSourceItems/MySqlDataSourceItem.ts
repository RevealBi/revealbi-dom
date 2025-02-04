import { DataSource } from "../DataSource";
import { MySqlDataSource, MicrosoftSqlServerDataSource } from "../DataSources";
import { IProcessDataOnServer } from "../Interfaces/IProcessDataOnServer";
import { ProcedureDataSourceItem } from "../ProcedureDataSourceItem";


export class MySqlDataSourceItem extends ProcedureDataSourceItem implements IProcessDataOnServer {
    constructor(title: string, dataSource: DataSource, table?: string) {
        super(title, dataSource);
        this.processDataOnServer = true;
        if(table){
            this.table = table;
        }
    }

    get processDataOnServer(): boolean {
        return this.properties["ServerAggregation"];
    }

    set processDataOnServer(value: boolean) {
        this.properties["ServerAggregation"] = value;
    }

    protected override createDataSourceInstance(dataSource: DataSource): DataSource {
        return this.create(MySqlDataSource, dataSource);
    }
}
