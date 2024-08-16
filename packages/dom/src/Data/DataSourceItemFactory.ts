import { DataSource } from "./DataSource";
import { DataSourceItem } from "./DataSourceItem";
import { MicrosoftSqlServerDataSourceItem } from "./DataSourceItems";
import { DataSourceType } from "./Enums/DataSourceType";

export class DataSourceItemFactory {
    static create(dataSourceType: DataSourceType, id: string, title:string, subtitle?: string, dataSource?: DataSource) {
        let dataSourceItem: DataSourceItem;

        switch (dataSourceType) {
            case DataSourceType.MicrosoftSqlServer:
                dataSourceItem = new MicrosoftSqlServerDataSourceItem(title, undefined, dataSource);
                break;
            default:
                throw new Error(`Unknown data source type: ${dataSourceType}`);
        }

        dataSourceItem.id = id;
        dataSourceItem.subtitle = subtitle;
        return dataSourceItem;
    }
}