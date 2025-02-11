import { DataSource } from "../DataSource";
import { DataSourceItem } from "../DataSourceItem";
import { GoogleBigQueryDataSource } from "../DataSources";


export class GoogleBigQueryDataSourceItem extends DataSourceItem {
    constructor(title: string, dataSource: DataSource) {
        super(title, dataSource);
    }

    get dataSetId(): string {
        return this.properties["datasetId"];
    }

    set dataSetId(value: string) {
        this.properties["datasetId"] = value;
    }

    get projectId(): string {
        return this.properties["projectId"];
    }

    set projectId(value: string) {
        this.properties["projectId"] = value;
    }

    get table(): string {
      return this.properties["tableId"];
  }

  set table(value: string) {
      this.properties["tableId"] = value;
  }

    protected override createDataSourceInstance(dataSource: DataSource): DataSource {
        return this.create(GoogleBigQueryDataSource, dataSource);
    }
}
