import { DataSource } from "../DataSource";
import { DataSourceItem } from "../DataSourceItem";


export class GoogleDriveDataSourceItem extends DataSourceItem {
    constructor(title: string, dataSource: DataSource) {
        super(title, dataSource);
    }

    get identifier(): string {
        return this.properties["Identitifer"];
    }

    set identifier(value: string) {
        this.properties["Identitifer"] = value;
    }
}
