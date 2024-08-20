import { DataSource } from "./DataSource";

export abstract class DatabaseDataSource extends DataSource {
    
    constructor()
    constructor(title: string)
    constructor(title: string, subtitle: string)
    constructor(title: string = "", subtitle: string = "") {
        super(title, subtitle);
    }

    get database(): string {
        return this.properties["Database"];
    }
    set database(value: string) {
        this.properties["Database"] = value;
    }
}