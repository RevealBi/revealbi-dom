import { DataSourceProvider } from "../../Core/Constants/DataSourceProvider";
import { DatabaseDataSource } from "../DatabaseDataSource";

export class GoogleBigQueryDataSource extends DatabaseDataSource {
    constructor()
    constructor(title: string)
    constructor(title: string, subtitle: string)
    constructor(title: string = "", subtitle: string = "") {
        super(title, subtitle);
        this.provider = DataSourceProvider.GoogleBigQuery;
    }

    get projectId(): string {
        return this.properties["ProjectId"];
    }

    set projectId(value: string) {
        this.properties["ProjectId"] = value;
    }
}
