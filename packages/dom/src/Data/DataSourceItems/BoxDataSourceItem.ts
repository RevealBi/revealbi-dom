import { DataSource } from "../DataSource";
import { DataSourceItem } from "../DataSourceItem";


export class BoxDataSourceItem extends DataSourceItem {
    constructor(title: string, dataSource: DataSource) {
        super(title, dataSource);
    }

    get identifier(): string {
        return this.properties["Identifier"];
    }

    set identifier(value: string) {
        this.properties["Identifier"] = value;
    }
}
