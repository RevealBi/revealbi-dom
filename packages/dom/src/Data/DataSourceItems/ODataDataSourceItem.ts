import { DataSource } from "../DataSource";
import { DataSourceItem } from "../DataSourceItem";


export class ODataDataSourceItem extends DataSourceItem {
    constructor(title: string, dataSource: DataSource) {
        super(title, dataSource);
    }

    get entityType(): string {
        return this.properties["EntityType"];
    }

    set entityType(value: string) {
        this.properties["EntityType"] = value;
    }

    get functionQName(): string {
        return this.properties["FunctionQName"];
    }

    set functionQName(value: string) {
        this.properties["FunctionQName"] = value;
    }

    get url(): string {
        return this.properties["Url"];
    }

    set url(value: string) {
        this.properties["Url"] = value;
    }
}
