import { DataSource } from "../DataSource";
import { FunctionDataSourceItem } from "../FunctionDataSourceItem";
import { IProcessDataOnServer } from "../Interfaces/IProcessDataOnServer";


export class PostgreSqlDataSourceItem extends FunctionDataSourceItem implements IProcessDataOnServer {
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
