import { DataSourceIds } from "../../Core/Constants/DataSourceIds";
import { DataSourceProvider } from "../../Core/Constants/DataSourceProvider";
import { DataSource } from "../DataSource";

export class LocalFileDataSource extends DataSource {
    constructor() {
        super();
        this.id = DataSourceIds.LOCALFILE;
        this.provider = DataSourceProvider.LocalFile;
    }
}
