import { DataSourceProvider } from "../../Core/Constants/DataSourceProvider";
import { ProcessDataSource } from "../ProcessDataSource";

export class SnowflakeDataSource extends ProcessDataSource {
    constructor() {
        super();
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
