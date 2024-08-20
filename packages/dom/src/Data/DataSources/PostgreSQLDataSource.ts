import { DataSourceProvider } from "../../Core/Constants/DataSourceProvider";
import { SchemaDataSource } from "../SchemaDataSource";

export class PostgreSqlDataSource extends SchemaDataSource {
    constructor()
    constructor(title: string)
    constructor(title: string, subtitle: string)
    constructor(title: string = "", subtitle: string = "") {
        super(title, subtitle);
        this.provider = DataSourceProvider.PostgreSQL;
    }
}
