import { DataSource } from "../DataSource";
import { DataSourceItem } from "../DataSourceItem";


export class AmazonS3DataSourceItem extends DataSourceItem {
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
