import { DataSource } from "../DataSource";
import { DataSourceItem } from "../DataSourceItem";


export class GoogleDriveDataSourceItem extends DataSourceItem {
    constructor(title: string, dataSource: DataSource) {
        super(title, dataSource);
    }

    get identifier(): string | undefined {
        return this.properties["Identifier"];
    }

    set identifier(value: string | undefined) {
        this.properties["Identifier"] = value;
    }
}
