import { DataSourceProvider } from "../../Core/Constants/DataSourceProvider";
import { MicrosoftAzureSqlServerDataSource } from "./MicrosoftAzureSqlServerDataSource";

export class MicrosoftAzureSynapseAnalyticsDataSource extends MicrosoftAzureSqlServerDataSource {
    constructor()
    constructor(title: string)
    constructor(title: string, subtitle: string)
    constructor(title: string = "", subtitle: string = "") {
        super(title, subtitle);
        this.provider = DataSourceProvider.MicrosoftAzureSynapseAnalytics;
    }
}
