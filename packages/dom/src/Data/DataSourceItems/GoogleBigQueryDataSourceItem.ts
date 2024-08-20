import { DataSource } from "../DataSource";
import { TableDataSourceItem } from "../TableDataSourceItem";


export class GoogleBigQueryDataSourceItem extends TableDataSourceItem {
    constructor(title: string, dataSource: DataSource) {
        super(title, dataSource);
    }

    get dataSetId(): string {
        return this.properties["DataSetId"];
    }

    set dataSetId(value: string) {
        this.properties["DataSetId"] = value;
    }

    get projectId(): string {
        return this.properties["ProjectId"];
    }

    set projectId(value: string) {
        this.properties["ProjectId"] = value;
    }
}
