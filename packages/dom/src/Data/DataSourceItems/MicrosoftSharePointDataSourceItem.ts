import { DataSource } from "../DataSource";
import { DataSourceItem } from "../DataSourceItem";


export class MicrosoftSharePointDataSourceItem extends DataSourceItem {
    constructor(title: string, dataSource: DataSource) {
        super(title, dataSource);
    }
}
