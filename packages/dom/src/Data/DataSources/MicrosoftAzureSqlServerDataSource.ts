import { DataSourceProvider } from "../../Core/Constants/DataSourceProvider";
import { MicrosoftSqlServerDataSource } from "./MicrosoftSqlServerDataSource";

export class MicrosoftAzureSqlServerDataSource extends MicrosoftSqlServerDataSource {
    constructor()
    constructor(title: string)
    constructor(title: string, subtitle: string)
    constructor(title: string = "", subtitle: string = "") {
        super(title, subtitle);
        this.provider = DataSourceProvider.MicrosoftAzureSqlServer;
    }

    get trustServerCertificate(): boolean {
        return this.properties["TrustServerCertificate"];
    }

    set trustServerCertificate(value: boolean) {
        this.properties["TrustServerCertificate"] = value;
    }
}
