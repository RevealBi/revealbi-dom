import { DataSourceProvider } from "../../Core/Constants/DataSourceProvider";
import { DataSource } from "../DataSource";

export class GoogleAnalytics4DataSource extends DataSource {
    constructor() {
        super();
        this.provider = DataSourceProvider.GoogleAnalytics4;
    }
}
