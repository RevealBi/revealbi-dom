import { DataSourceProvider } from "../../Core/Constants/DataSourceProvider";
import { DataSource } from "../DataSource";

export class GoogleDriveDataSource extends DataSource {
    constructor() {
        super();
        this.provider = DataSourceProvider.GoogleDrive;
    }
}
