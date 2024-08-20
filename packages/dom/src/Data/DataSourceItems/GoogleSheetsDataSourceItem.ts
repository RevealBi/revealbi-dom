import { DataSource } from "../DataSource";
import { DataSourceItem } from "../DataSourceItem";
import { GoogleSheetsDataSource } from "../DataSources";


export class GoogleSheetsDataSourceItem extends DataSourceItem {
    constructor(title: string, dataSource: DataSource) {
        super(title, dataSource);
    }

    get firstRowContainsLabels(): boolean {
        return this.properties["FirstRowContainsLabels"];
    }

    set firstRowContainsLabels(value: boolean) {
        this.properties["FirstRowContainsLabels"] = value;
    }

    get namedRange(): string {
        return this.properties["NamedRange"];
    }

    set namedRange(value: string) {
        this.properties["NamedRange"] = value;
    }

    get pivotTable(): string {
        return this.properties["PivotTable"];
    }

    set pivotTable(value: string) {
        this.properties["PivotTable"] = value;
    }

    get sheet(): string {
        return this.properties["Sheet"];
    }

    set sheet(value: string) {
        this.properties["Sheet"] = value;
    }

    protected override createDataSourceInstance(dataSource: DataSource): DataSource {
        return this.create(GoogleSheetsDataSource, dataSource);
    }
}
