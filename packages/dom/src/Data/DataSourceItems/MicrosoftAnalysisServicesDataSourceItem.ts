import { DataSource } from "../DataSource";
import { DataSourceItem } from "../DataSourceItem";
import { MicrosoftAnalysisServicesDataSource } from "../DataSources";


export class MicrosoftAnalysisServicesDataSourceItem extends DataSourceItem {
    constructor(title: string, dataSource: MicrosoftAnalysisServicesDataSource | DataSource) {
        super(title, dataSource);
    }

    get catalog(): string {
        return this.properties["Catalog"];
    }

    set catalog(value: string) {
        this.properties["Catalog"] = value;
    }

    get cube(): string {
        return this.properties["Cube"];
    }

    set cube(value: string) {
        this.properties["Cube"] = value;
    }

    protected override createDataSourceInstance(dataSource: DataSource): DataSource {
        return this.create(MicrosoftAnalysisServicesDataSource, dataSource);
    }

    protected override initializeDataSourceItem(title: string): void {
        super.initializeDataSourceItem(title);
        this.hasTabularData = false;
    }
}
