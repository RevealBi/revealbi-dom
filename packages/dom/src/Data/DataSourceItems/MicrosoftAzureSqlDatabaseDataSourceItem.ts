import { DataSource } from "../DataSource";
import { MicrosoftSqlServerDataSourceItem } from "./MicrosoftSqlServerDataSourceItem";


export class MicrosoftAzureSqlDatabaseDataSourceItem extends MicrosoftSqlServerDataSourceItem {
    constructor(title: string, dataSource: DataSource) {
        super(title, dataSource);
    }
}
