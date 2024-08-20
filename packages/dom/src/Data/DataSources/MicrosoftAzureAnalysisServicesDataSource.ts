import { DataSourceProvider } from "../../Core/Constants/DataSourceProvider";
import { MicrosoftAnalysisServicesDataSource } from "./MicrosoftAnalysisServicesDataSource";

export class MicrosoftAzureAnalysisServicesDataSource extends MicrosoftAnalysisServicesDataSource {
    constructor()
    constructor(title: string)
    constructor(title: string, subtitle: string)
    constructor(title: string = "", subtitle: string = "") {
        super(title, subtitle);
        this.provider = DataSourceProvider.MicrosoftAzureAnalysisServices;
    }

    get serverUrl(): string {
        return this.properties["ServerUrl"];
    }

    set serverUrl(value: string) {
        this.properties["ServerUrl"] = value;
    }
}
