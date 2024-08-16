import { DataSourceProvider } from "../../Core/Constants/DataSourceProvider";
import { HostDataSource } from "../HostDataSource";

export class OracleDataSource extends HostDataSource {
    constructor() {
        super();
        this.provider = DataSourceProvider.Oracle;
    }

    get service(): string {
        return this.properties["Service"];
    }

    set service(value: string) {
        this.properties["Service"] = value;
    }

    get sid(): string {
        return this.properties["SID"];
    }

    set sid(value: string) {
        this.properties["SID"] = value;
    }
}
