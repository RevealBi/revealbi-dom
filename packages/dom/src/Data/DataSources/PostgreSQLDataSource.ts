import { DataSourceProvider } from "../../Core/Constants/DataSourceProvider";
import { SchemaDataSource } from "../SchemaDataSource";

export class PostgreSQLDataSource extends SchemaDataSource {
    constructor() {
        super();
        this.provider = DataSourceProvider.PostgreSQL;
    }
}
