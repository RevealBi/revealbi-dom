import { CubeDataSource } from "../DataSources";
import { DataSource } from "../DataSource";
import { DataSourceItem } from "../DataSourceItem";

export class CubeDataSourceItem extends DataSourceItem {
    constructor(title: string, dataSource: DataSource) {
        super(title, dataSource);
    }

    get cube(): string {
        return this.properties["Cube"];
    }

    set cube(value: string) {
        this.properties["Cube"] = value;
    }

    protected override createDataSourceInstance(dataSource: DataSource): DataSource {
        return this.create(CubeDataSource, dataSource);
    }
}
