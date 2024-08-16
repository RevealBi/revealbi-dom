import { DataSourceIds } from "../../Core/Constants/DataSourceIds";
import { DataSourceProvider } from "../../Core/Constants/DataSourceProvider";
import { DataSource } from "../DataSource";

export class CsvDataSource extends DataSource {
    constructor() {
        super();
        this.id = DataSourceIds.CSV;
        this.provider = DataSourceProvider.CSV;
    }
}
