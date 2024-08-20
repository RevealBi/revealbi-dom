import { DataSourceIds } from "../../Core/Constants/DataSourceIds";
import { DataSourceProvider } from "../../Core/Constants/DataSourceProvider";
import { DataSource } from "../DataSource";

export class JsonDataSource extends DataSource {
    constructor()
    constructor(title: string)
    constructor(title: string, subtitle: string)
    constructor(title: string = "", subtitle: string = "") {
        super(title, subtitle);
        this.id = DataSourceIds.JSON;
        this.provider = DataSourceProvider.JSON;
    }
}
