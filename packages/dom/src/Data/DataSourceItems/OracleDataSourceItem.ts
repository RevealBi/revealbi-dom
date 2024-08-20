import { DataSource } from "../DataSource";
import { ProcedureDataSourceItem } from "../ProcedureDataSourceItem";


export class OracleDataSourceItem extends ProcedureDataSourceItem {
    constructor(title: string, dataSource: DataSource) {
        super(title, dataSource);
    }
}
