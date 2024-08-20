import { DataSource } from "../DataSource";
import { DataSourceItem } from "../DataSourceItem";


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
}
