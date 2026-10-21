import { DataSourceProvider } from "../../Core/Constants/DataSourceProvider";
import { ProcessDataSource } from "../ProcessDataSource";

export class ClickHouseDataSource extends ProcessDataSource {
    constructor()
    constructor(title: string)
    constructor(title: string, subtitle: string)
    constructor(title: string = "", subtitle: string = "") {
        super(title, subtitle);
        this.provider = DataSourceProvider.ClickHouse;
    }

    get protocol(): string {
        return this.properties["Protocol"];
    }
    set protocol(value: string) {
        this.properties["Protocol"] = value;
    }

    get path(): string {
        return this.properties["Path"];
    }
    set path(value: string) {
        this.properties["Path"] = value;
    }
}
