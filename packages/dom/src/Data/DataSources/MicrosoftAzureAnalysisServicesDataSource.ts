import { DataSourceProvider } from "../../Core/Constants/DataSourceProvider";
import { MicrosoftAnalysisServicesDataSource } from "./MicrosoftAnalysisServicesDataSource";

export class MicrosoftAzureAnalysisServicesDataSource extends MicrosoftAnalysisServicesDataSource {
    constructor() {
        super();
        this.provider = DataSourceProvider.MicrosoftAzureAnalysisServices;
    }

    get serverUrl(): string {
        return this.properties["ServerUrl"];
    }

    set serverUrl(value: string) {
        this.properties["ServerUrl"] = value;
    }
}
