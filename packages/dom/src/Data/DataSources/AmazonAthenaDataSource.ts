import { DataSourceProvider } from "../../Core/Constants/DataSourceProvider";
import { DatabaseDataSource } from "../DatabaseDataSource";

export class AmazonAthenaDataSource extends DatabaseDataSource {
    constructor()
    constructor(title: string)
    constructor(title: string, subtitle: string)
    constructor(title: string = "", subtitle: string = "") {
        super(title, subtitle);
        this.provider = DataSourceProvider.AmazonAthena;
    }

    get dataCatalog(): string {
        return this.properties["DataCatalog"];
    }

    set dataCatalog(value: string) {
        this.properties["DataCatalog"] = value;
    }

    get outputLocation(): string {
        return this.properties["OutputLocation"];
    }

    set outputLocation(value: string) {
        this.properties["OutputLocation"] = value;
    }

    get region(): string {
        return this.properties["Region"];
    }

    set region(value: string) {
        this.properties["Region"] = value;
    }

    get workgroup(): string {
        return this.properties["Workgroup"];
    }

    set workgroup(value: string) {
        this.properties["Workgroup"] = value;
    }
}
