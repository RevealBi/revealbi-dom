import { DataSource } from "../DataSource";
import { DataSourceItem } from "../DataSourceItem";


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
}
