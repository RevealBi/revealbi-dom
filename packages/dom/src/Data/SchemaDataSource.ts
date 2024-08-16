import { ProcessDataSource } from "./ProcessDataSource";

export abstract class SchemaDataSource extends ProcessDataSource {

    get schema(): string {
        return this.properties["Schema"];
    }
    set schema(value: string) {
        this.properties["Schema"] = value;
    }
}
