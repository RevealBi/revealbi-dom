import { DataSourceProvider } from "../../Core/Constants/DataSourceProvider";
import { SchemaDataSource } from "../SchemaDataSource";

export class MicrosoftSqlServerDataSource extends SchemaDataSource {

    constructor() {
        super();
        this.provider = DataSourceProvider.MicrosoftSqlServer;
    }

    get encrypt(): boolean {
        return this.properties["Encrypt"];
    }
    set encrypt(value: boolean) {
        this.properties["Encrypt"] = value;
    }
}