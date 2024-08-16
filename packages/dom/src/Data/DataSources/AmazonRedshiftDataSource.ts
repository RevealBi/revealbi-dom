import { DataSourceProvider } from "../../Core/Constants/DataSourceProvider";
import { HostDataSource } from "../HostDataSource";

export class AmazonRedshiftDataSource extends HostDataSource {
    constructor() {
        super();
        this.provider = DataSourceProvider.AmazonRedshift;
    }

    get schema(): string {
        return this.properties["Schema"];
    }

    set schema(value: string) {
        this.properties["Schema"] = value;
    }
}
