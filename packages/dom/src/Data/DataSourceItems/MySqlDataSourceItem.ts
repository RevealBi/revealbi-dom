import { DataSource } from "../DataSource";
import { IProcessDataOnServer } from "../Interfaces/IProcessDataOnServer";
import { ProcedureDataSourceItem } from "../ProcedureDataSourceItem";


export class MySqlDataSourceItem extends ProcedureDataSourceItem implements IProcessDataOnServer {
    constructor(title: string, dataSource: DataSource) {
        super(title, dataSource);
    }

    get processDataOnServer(): boolean {
        return this.properties["ServerAggregation"];
    }

    set processDataOnServer(value: boolean) {
        this.properties["ServerAggregation"] = value;
    }
}
