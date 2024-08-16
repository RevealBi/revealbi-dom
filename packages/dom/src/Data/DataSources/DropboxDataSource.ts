import { DataSourceProvider } from "../../Core/Constants/DataSourceProvider";
import { DataSource } from "../DataSource";

export class DropboxDataSource extends DataSource {
    constructor() {
        super();
        this.provider = DataSourceProvider.Dropbox;
    }
}
