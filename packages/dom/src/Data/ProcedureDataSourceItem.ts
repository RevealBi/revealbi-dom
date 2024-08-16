import { DatabaseDataSourceItem } from "./DatabaseDataSourceItem";
import { DataSource } from "./DataSource";

export abstract class ProcedureDataSourceItem extends DatabaseDataSourceItem {

    constructor(title: string, dataSource: DataSource) {
        super(title, dataSource);
    }

    get procedure(): string {
        return this.properties["Procedure"];
    }

    set procedure(value: string) {
        this.properties["Procedure"] = value;
    }

    get procedureParameters(): string {
        return this.properties["ProcedureParameters"];
    }

    set procedureParameters(value: string) {
        this.properties["ProcedureParameters"] = value;
    }
}
