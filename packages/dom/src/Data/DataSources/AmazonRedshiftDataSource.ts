import { DataSourceProvider } from "../../Core/Constants/DataSourceProvider";
import { HostDataSource } from "../HostDataSource";

export class AmazonRedshiftDataSource extends HostDataSource {
    constructor()
    constructor(title: string)
    constructor(title: string, subtitle: string)
    constructor(title: string = "", subtitle: string = "") {
        super(title, subtitle);
        this.provider = DataSourceProvider.AmazonRedshift;
    }

    get schema(): string {
        return this.properties["Schema"];
    }

    set schema(value: string) {
        this.properties["Schema"] = value;
    }
}
