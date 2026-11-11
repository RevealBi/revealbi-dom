import { DataSourceProvider } from "../../Core/Constants/DataSourceProvider";
import { ProcessDataSource } from "../ProcessDataSource";

export class SqliteDataSource extends ProcessDataSource {
    constructor()
    constructor(title: string)
    constructor(title: string, subtitle: string)
    constructor(title: string = "", subtitle: string = "") {
        super(title, subtitle);
        this.provider = DataSourceProvider.SQLite;
    }
}
