import { DataSourceProvider } from "../../Core/Constants/DataSourceProvider";
import { DataSource } from "../DataSource";

export class CubeDataSource extends DataSource {
    constructor()
    constructor(title: string)
    constructor(title: string, subtitle: string)
    constructor(title: string = "", subtitle: string = "") {
        super(title, subtitle);
        this.provider = DataSourceProvider.Cube;
    }

    get url(): string {
        return this.properties["Url"];
    }
    set url(value: string) {
        this.properties["Url"] = value;
    }
}
