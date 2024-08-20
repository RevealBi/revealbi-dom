import { DataSource } from "../DataSource";
import { DataSourceItem } from "../DataSourceItem";
import { DropboxDataSource } from "../DataSources";


export class DropboxDataSourceItem extends DataSourceItem {
    constructor(title: string, dataSource: DataSource) {
        super(title, dataSource);
    }

    get path(): string {
        return this.properties["Path"];
    }

    set path(value: string) {
        this.properties["Path"] = value;
    }

    protected override createDataSourceInstance(dataSource: DataSource): DataSource {
        return this.create(DropboxDataSource, dataSource);
    }
}
