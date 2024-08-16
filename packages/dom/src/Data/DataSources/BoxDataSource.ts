import { DataSourceProvider } from "../../Core/Constants/DataSourceProvider";
import { DataSource } from "../DataSource";

export class BoxDataSource extends DataSource {
    constructor() {
        super();
        this.provider = DataSourceProvider.Box;
    }
}
