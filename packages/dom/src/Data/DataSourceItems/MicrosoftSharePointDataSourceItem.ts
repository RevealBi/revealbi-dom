import { DataSource } from "../DataSource";
import { DataSourceItem } from "../DataSourceItem";
import { MicrosoftSharePointDataSource } from "../DataSources";


export class MicrosoftSharePointDataSourceItem extends DataSourceItem {
    constructor(title: string, dataSource: DataSource) {
        super(title, dataSource);
    }

    protected override createDataSourceInstance(dataSource: DataSource): DataSource {
        return this.create(MicrosoftSharePointDataSource, dataSource);
    }
}
