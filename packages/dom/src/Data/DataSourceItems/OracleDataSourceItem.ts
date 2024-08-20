import { DataSource } from "../DataSource";
import { OracleDataSource } from "../DataSources";
import { ProcedureDataSourceItem } from "../ProcedureDataSourceItem";


export class OracleDataSourceItem extends ProcedureDataSourceItem {
    constructor(title: string, dataSource: DataSource) {
        super(title, dataSource);
    }

    protected override createDataSourceInstance(dataSource: DataSource): DataSource {
        return this.create(OracleDataSource, dataSource);
    }
}
