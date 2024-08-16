import { MicrosoftAnalysisServicesDataSource } from "./MicrosoftAnalysisServicesDataSource";

export class HttpAnalysisServicesDataSource extends MicrosoftAnalysisServicesDataSource {
    constructor() {
        super();
        this.properties["Mode"] = "HTTP";
    }

    get url(): string {
        return this.properties["Url"];
    }

    set url(value: string) {
        this.properties["Url"] = value;
    }
}
