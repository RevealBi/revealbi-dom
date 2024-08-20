import { DataSource } from "./DataSource";
import { SchemaDataSourceItem } from "./SchemaDataSourceItem";

export abstract class FunctionDataSourceItem extends SchemaDataSourceItem {
    constructor(title: string, dataSource: DataSource) {
        super(title, dataSource);
    }

    get functionName(): string {
        return this.properties["FunctionName"];
    }

    set functionName(value: string) {
        this.properties["FunctionName"] = value;
    }

    get functionParameters(): string {
        return this.properties["FunctionParameters"];
    }

    set functionParameters(value: string) {
        this.properties["FunctionParameters"] = value;
    }
}
