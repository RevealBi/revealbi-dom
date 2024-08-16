import { DataSourceProvider } from "../../Core/Constants/DataSourceProvider";
import { ODataDataSource } from "./ODataDataSource";

export class RestDataSource extends ODataDataSource {
    constructor() {
        super();
        this.provider = DataSourceProvider.REST;
    }

    get body(): string {
        return this.properties["Body"];
    }

    set body(value: string) {
        this.properties["Body"] = value;
    }

    get contentType(): string {
        return this.properties["ContentType"];
    }

    set contentType(value: string) {
        this.properties["ContentType"] = value;
    }

    get headers(): string[] {
        return this.properties["Headers"];
    }

    set headers(value: string[]) {
        this.properties["Headers"] = value;
    }

    get method(): string {
        return this.properties["Method"];
    }

    set method(value: string) {
        this.properties["Method"] = value;
    }
}
