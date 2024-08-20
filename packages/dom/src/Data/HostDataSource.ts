import { DatabaseDataSource } from "./DatabaseDataSource";

export abstract class HostDataSource extends DatabaseDataSource {

    constructor()
    constructor(title: string)
    constructor(title: string, subtitle: string)
    constructor(title: string = "", subtitle: string = "") {
        super(title, subtitle);
    }

    get host(): string {
        return this.properties["Host"];
    }
    set host(value: string) {
        this.properties["Host"] = value;
    }

    get port(): string {
        return this.properties["Port"];
    }
    set port(value: string) {
        this.properties["Port"] = value;
    }
}
