import { DataSourceProvider } from "../../Core/Constants/DataSourceProvider";
import { DataSource } from "../DataSource";

export class WebServiceDataSource extends DataSource {
    constructor()
    constructor(title: string)
    constructor(title: string, subtitle: string)
    constructor(title: string = "", subtitle: string = "") {
        super(title, subtitle);
        this.provider = DataSourceProvider.WebService;
    }

    get url(): string {
        return this.properties["URL"];
    }

    set url(value: string) {
        this.properties["URL"] = value;
    }

    get useAnonymousAuthentication(): boolean {
        return this.properties["UseAnonymousAuthentication"];
    }

    set useAnonymousAuthentication(value: boolean) {
        this.properties["UseAnonymousAuthentication"] = value;
    }
}
