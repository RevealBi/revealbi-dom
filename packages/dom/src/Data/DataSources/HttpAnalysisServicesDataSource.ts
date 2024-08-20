import { MicrosoftAnalysisServicesDataSource } from "./MicrosoftAnalysisServicesDataSource";

export class HttpAnalysisServicesDataSource extends MicrosoftAnalysisServicesDataSource {
    constructor()
    constructor(title: string)
    constructor(title: string, subtitle: string)
    constructor(title: string = "", subtitle: string = "") {
        super(title, subtitle);
        this.properties["Mode"] = "HTTP";
    }

    get url(): string {
        return this.properties["Url"];
    }

    set url(value: string) {
        this.properties["Url"] = value;
    }
}
