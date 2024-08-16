import { DataSource } from "./DataSource";
import { DataSourceItem } from "./DataSourceItem";

export abstract class TableDataSourceItem extends DataSourceItem {
    constructor(title: string, dataSource: DataSource) {
        super(title, dataSource);
    }

    get table(): string {
        return this.properties["Table"];
    }

    set table(value: string) {
        this.properties["Table"] = value;
    }
}
