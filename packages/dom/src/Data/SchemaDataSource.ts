import { ProcessDataSource } from "./ProcessDataSource";

export abstract class SchemaDataSource extends ProcessDataSource {

    constructor()
    constructor(title: string)
    constructor(title: string, subtitle: string)
    constructor(title: string = "", subtitle: string = "") {
        super(title, subtitle);
    }

    get schema(): string {
        return this.properties["Schema"];
    }
    set schema(value: string) {
        this.properties["Schema"] = value;
    }
}
