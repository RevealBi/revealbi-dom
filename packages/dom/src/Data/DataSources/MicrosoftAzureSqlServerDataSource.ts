import { DataSourceProvider } from "../../Core/Constants/DataSourceProvider";
import { MicrosoftSqlServerDataSource } from "./MicrosoftSqlServerDataSource";

export class MicrosoftAzureSqlServerDataSource extends MicrosoftSqlServerDataSource {
    constructor() {
        super();
        this.provider = DataSourceProvider.MicrosoftAzureSqlServer;
    }

    get trustServerCertificate(): boolean {
        return this.properties["TrustServerCertificate"];
    }

    set trustServerCertificate(value: boolean) {
        this.properties["TrustServerCertificate"] = value;
    }
}
