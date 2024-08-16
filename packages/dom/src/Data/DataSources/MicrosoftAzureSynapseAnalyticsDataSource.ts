import { DataSourceProvider } from "../../Core/Constants/DataSourceProvider";
import { MicrosoftAzureSqlServerDataSource } from "./MicrosoftAzureSqlServerDataSource";

export class MicrosoftAzureSynapseAnalyticsDataSource extends MicrosoftAzureSqlServerDataSource {
    constructor() {
        super();
        this.provider = DataSourceProvider.MicrosoftAzureSynapseAnalytics;
    }
}
