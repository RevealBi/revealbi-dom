import { DataSource } from "../DataSource";
import { DataSourceItem } from "../DataSourceItem";
import { WebServiceDataSource } from "../DataSources";


export class WebServiceDataSourceItem extends DataSourceItem {
    constructor(title: string, dataSource: DataSource) {
        super(title, dataSource);
    }

    get url(): string {
        return this.properties["Url"];
    }

    set url(value: string) {
        this.properties["Url"] = value;
    }

    protected override createDataSourceInstance(dataSource: DataSource): DataSource {
        return this.create(WebServiceDataSource, dataSource);
    }
}
