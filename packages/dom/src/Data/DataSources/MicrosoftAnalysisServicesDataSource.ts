import { DataSourceProvider } from "../../Core/Constants/DataSourceProvider";
import { DataSource } from "../DataSource";

export class MicrosoftAnalysisServicesDataSource extends DataSource {
    constructor()
    constructor(title: string)
    constructor(title: string, subtitle: string)
    constructor(title: string = "", subtitle: string = "") {
        super(title, subtitle);
        this.provider = DataSourceProvider.MicrosoftAnalysisServices;
    }

    get catalog(): string {
        return this.properties["Catalog"];
    }

    set catalog(value: string) {
        this.properties["Catalog"] = value;
    }

    get host(): string {
        return this.properties["Host"];
    }

    set host(value: string) {
        this.properties["Host"] = value;
    }

    get port(): number {
        return this.properties["Port"];
    }

    set port(value: number) {
        this.properties["Port"] = value;
    }
}
