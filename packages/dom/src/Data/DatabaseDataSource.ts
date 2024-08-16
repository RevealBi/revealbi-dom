import { DataSource } from "./DataSource";

export abstract class DatabaseDataSource extends DataSource {
    
    get database(): string {
        return this.properties["Database"];
    }
    set database(value: string) {
        this.properties["Database"] = value;
    }
}