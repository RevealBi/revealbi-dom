import { DataSourceProvider } from "../../Core/Constants/DataSourceProvider";
import { DataSource } from "../DataSource";

export class AmazonS3DataSource extends DataSource {
    constructor()
    constructor(title: string)
    constructor(title: string, subtitle: string)
    constructor(title: string = "", subtitle: string = "") {
        super(title, subtitle);
        this.provider = DataSourceProvider.AmazonS3;
    }

    get accountId(): string {
        return this.properties["AccountId"];
    }

    set accountId(value: string) {
        this.properties["AccountId"] = value;
    }

    get region(): string {
        return this.properties["Region"];
    }

    set region(value: string) {
        this.properties["Region"] = value;
    }
}
