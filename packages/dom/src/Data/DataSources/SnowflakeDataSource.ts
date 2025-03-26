import { DataSourceProvider } from "../../Core/Constants/DataSourceProvider";
import { SchemaDataSource } from "../SchemaDataSource";

export class SnowflakeDataSource extends SchemaDataSource {
    constructor()
    constructor(title: string)
    constructor(title: string, subtitle: string)
    constructor(title: string = "", subtitle: string = "") {
        super(title, subtitle);
        this.provider = DataSourceProvider.Snowflake;
    }

    get account(): string {
        return this.properties["Account"];
    }

    set account(value: string) {
        this.properties["Account"] = value;
    }

    get role(): string {
        return this.properties["Role"];
    }

    set role(value: string) {
        this.properties["Role"] = value;
    }

    get warehouse(): string {
        return this.properties["Warehouse"];
    }

    set warehouse(value: string) {
        this.properties["Warehouse"] = value;
    }
}
