import { DataSourceProvider } from "../../Core/Constants/DataSourceProvider";
import { WebServiceDataSource } from "./WebServiceDataSource";

export class ODataDataSource extends WebServiceDataSource {
    constructor() {
        super();
        this.provider = DataSourceProvider.OData;
    }

    get usePreemptiveAuthentication(): boolean {
        return this.properties["UsePreemptiveAuthentication"];
    }

    set usePreemptiveAuthentication(value: boolean) {
        this.properties["UsePreemptiveAuthentication"] = value;
    }
}
