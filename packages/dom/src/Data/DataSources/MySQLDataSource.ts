import { DataSourceProvider } from "../../Core/Constants/DataSourceProvider";
import { ProcessDataSource } from "../ProcessDataSource";

export class MySQLDataSource extends ProcessDataSource {
    constructor() {
        super();
        this.provider = DataSourceProvider.MySQL;
    }
}
