import { DataSource } from "../DataSource";
import { DataSourceItem } from "../DataSourceItem";
import { GoogleAnalytics4DataSource } from "../DataSources";


export class GoogleAnalytics4DataSourceItem extends DataSourceItem {
    constructor(title: string, dataSource: DataSource) {
        super(title, dataSource);
    }

    get accountId(): string {
        return this.properties["AccountId"];
    }

    set accountId(value: string) {
        this.properties["AccountId"] = value;
    }

    get propertyId(): string {
        return this.properties["PropertyId"];
    }

    set propertyId(value: string) {
        this.properties["PropertyId"] = value;
    }

    protected override createDataSourceInstance(dataSource: DataSource): DataSource {
        return this.create(GoogleAnalytics4DataSource, dataSource);
    }
}
