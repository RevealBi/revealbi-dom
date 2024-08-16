import { DataSourceProvider } from "../../Core/Constants/DataSourceProvider";
import { DataSource } from "../DataSource";

export class MicrosoftSharePointDataSource extends DataSource {
    constructor() {
        super();
        this.provider = DataSourceProvider.MicrosoftSharePoint;
    }
}
