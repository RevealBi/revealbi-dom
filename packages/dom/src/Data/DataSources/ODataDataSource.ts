import { DataSourceProvider } from "../../Core/Constants/DataSourceProvider";
import { WebServiceDataSource } from "./WebServiceDataSource";

export class ODataDataSource extends WebServiceDataSource {
    constructor()
    constructor(title: string)
    constructor(title: string, subtitle: string)
    constructor(title: string = "", subtitle: string = "") {
        super(title, subtitle);
        this.provider = DataSourceProvider.OData;
    }

    get usePreemptiveAuthentication(): boolean {
        return this.properties["UsePreemptiveAuthentication"];
    }

    set usePreemptiveAuthentication(value: boolean) {
        this.properties["UsePreemptiveAuthentication"] = value;
    }
}
