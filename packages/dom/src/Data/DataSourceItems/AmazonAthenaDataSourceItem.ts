import { DataSource } from "../DataSource";
import { TableDataSourceItem } from "../TableDataSourceItem";

export class AmazonAthenaDataSourceItem extends TableDataSourceItem {
    constructor(title: string, dataSource: DataSource) {
        super(title, dataSource);
    }
}
