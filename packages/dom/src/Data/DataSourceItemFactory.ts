import { DataSource } from "./DataSource";
import { DataSourceItem } from "./DataSourceItem";
import { MicrosoftSqlServerDataSourceItem, RestDataSourceItem } from "./DataSourceItems";
import { DataSourceType } from "./Enums/DataSourceType";

export class DataSourceItemFactory {
    static create(dataSourceType: DataSourceType, id: string, title:string, subtitle?: string, dataSource?: DataSource) {
        let dataSourceItem: DataSourceItem;
        if (!dataSource) {
            dataSource = new DataSource();
        }

        switch (dataSourceType) {
            case DataSourceType.MicrosoftSqlServer:
                dataSourceItem = new MicrosoftSqlServerDataSourceItem(title, undefined, dataSource);
                break;
            case DataSourceType.REST:
                dataSourceItem = new RestDataSourceItem(title, dataSource)
                break;
            default:
                throw new Error(`Unknown data source type: ${dataSourceType}`);
        }

        dataSourceItem.id = id;
        dataSourceItem.subtitle = subtitle;
        return dataSourceItem;
    }
}