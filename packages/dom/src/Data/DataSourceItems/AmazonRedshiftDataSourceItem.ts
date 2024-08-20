import { DataSource } from "../DataSource";
import { FunctionDataSourceItem } from "../FunctionDataSourceItem";


export class AmazonRedshiftDataSourceItem extends FunctionDataSourceItem {
    constructor(title: string, dataSource: DataSource) {
        super(title, dataSource);
    }
}
