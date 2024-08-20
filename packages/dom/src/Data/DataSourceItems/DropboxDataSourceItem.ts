import { DataSource } from "../DataSource";
import { DataSourceItem } from "../DataSourceItem";


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
}
