import { DatabaseDataSourceItem } from "./DatabaseDataSourceItem";
import { DataSource } from "./DataSource";

export abstract class SchemaDataSourceItem extends DatabaseDataSourceItem {
    constructor(title: string, dataSource: DataSource) {
        super(title, dataSource);
    }

    get schema(): string {
        return this.properties["Schema"];
    }

    set schema(value: string) {
        this.properties["Schema"] = value;
    }
}
