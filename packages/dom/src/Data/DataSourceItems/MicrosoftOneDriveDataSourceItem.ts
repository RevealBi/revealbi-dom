import { DataSource } from "../DataSource";
import { DataSourceItem } from "../DataSourceItem";
import { MicrosoftOneDriveDataSource } from "../DataSources";


export class MicrosoftOneDriveDataSourceItem extends DataSourceItem {
    constructor(title: string, dataSource: DataSource) {
        super(title, dataSource);
    }

    get identifier(): string {
        return this.properties["Identifier"];
    }

    set identifier(value: string) {
        this.properties["Identifier"] = value;
    }

    protected override createDataSourceInstance(dataSource: DataSource): DataSource {
        return this.create(MicrosoftOneDriveDataSource, dataSource);
    }
}
