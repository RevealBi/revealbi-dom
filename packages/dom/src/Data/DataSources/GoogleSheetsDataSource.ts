import { DataSourceProvider } from "../../Core/Constants/DataSourceProvider";
import { DataSource } from "../DataSource";

export class GoogleSheetsDataSource extends DataSource {
    constructor() {
        super();
        this.provider = DataSourceProvider.GoogleSheets;
    }
}
