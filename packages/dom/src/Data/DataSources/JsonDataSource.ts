import { DataSourceIds } from "../../Core/Constants/DataSourceIds";
import { DataSourceProvider } from "../../Core/Constants/DataSourceProvider";
import { DataSource } from "../DataSource";

export class JsonDataSource extends DataSource {
    constructor() {
        super();
        this.id = DataSourceIds.JSON;
        this.provider = DataSourceProvider.JSON;
    }
}
