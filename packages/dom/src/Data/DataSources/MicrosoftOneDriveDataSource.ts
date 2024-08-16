import { DataSourceProvider } from "../../Core/Constants/DataSourceProvider";
import { DataSource } from "../DataSource";

export class MicrosoftOneDriveDataSource extends DataSource {
    constructor() {
        super();
        this.provider = DataSourceProvider.MicrosoftOneDrive;
    }
}
