import { DataSource } from "./DataSource";
import { TableDataSourceItem } from "./TableDataSourceItem";

export abstract class DatabaseDataSourceItem extends TableDataSourceItem {
    constructor(title: string, dataSource: DataSource) {
        super(title, dataSource);
    }

    get database(): string {
        return this.properties["Database"];
    }

    set database(value: string) {
        this.properties["Database"] = value;
    }
}
