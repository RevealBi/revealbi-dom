import { DataSourceProvider } from "../../Core/Constants/DataSourceProvider";
import { ProcessDataSource } from "../ProcessDataSource";

export class AzureCosmosDbDataSource extends ProcessDataSource {
    constructor()
    constructor(title: string)
    constructor(title: string, subtitle: string)
    constructor(title: string = "", subtitle: string = "") {
        super(title, subtitle);
        this.provider = DataSourceProvider.AzureCosmosDB;
    }

    get accountEndpoint(): string {
        return this.properties["AccountEndpoint"];
    }
    set accountEndpoint(value: string) {
        this.properties["AccountEndpoint"] = value;
    }

    get applicationRegion(): string {
        return this.properties["ApplicationRegion"];
    }
    set applicationRegion(value: string) {
        this.properties["ApplicationRegion"] = value;
    }

    get acceptAnyServerCertificate(): boolean {
        return this.properties["AcceptAnyServerCertificate"];
    }
    set acceptAnyServerCertificate(value: boolean) {
        this.properties["AcceptAnyServerCertificate"] = value;
    }
}
