import { DataSource } from "../DataSource";
import { DataSourceItem } from "../DataSourceItem";
import { GoogleDriveDataSource } from "../DataSources";


export class GoogleDriveDataSourceItem extends DataSourceItem {
    constructor(title: string, dataSource: DataSource) {
        super(title, dataSource);
    }

    get identifier(): string {
        return this.properties["Identitifer"];
    }

    set identifier(value: string) {
        this.properties["Identitifer"] = value;
    }

    protected override createDataSourceInstance(dataSource: DataSource): DataSource {
        return this.create(GoogleDriveDataSource, dataSource);
    }
}
