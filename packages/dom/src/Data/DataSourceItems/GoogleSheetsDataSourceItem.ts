import { DataSource } from "../DataSource";
import { DataSourceItem } from "../DataSourceItem";
import { GoogleSheetsDataSource } from "../DataSources";
import { GoogleDriveDataSource } from "../DataSources/GoogleDriveDataSource";
import { GoogleDriveDataSourceItem } from "./GoogleDriveDataSourceItem";


export class GoogleSheetsDataSourceItem extends DataSourceItem {
  constructor(title: string, identifierOrDataSource?: DataSource | string) {
    const ds = identifierOrDataSource instanceof DataSource ? identifierOrDataSource : undefined;

    super(title, ds);

    const identifier = identifierOrDataSource instanceof DataSource ? undefined : identifierOrDataSource;

    this.initializeResourceItem(title, identifier);
  }

  get firstRowContainsLabels(): boolean {
    return this.parameters["TITLES_IN_FIRST_ROW"];
  }

  set firstRowContainsLabels(value: boolean) {
    this.properties["TITLES_IN_FIRST_ROW"] = value;
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

  get identifier(): string {
    return this.resourceItem!.properties["Identifier"];
  }

  set identifier(value: string) {
    this.resourceItem!.properties["Identifier"] = value;
  }

  protected override createDataSourceInstance(dataSource: DataSource): DataSource {
    return this.create(GoogleSheetsDataSource, dataSource);
  }


  protected initializeResourceItem(title: string, identifier?: string) {
    this.resourceItemDataSource = new GoogleDriveDataSource();
    this.resourceItem = new GoogleDriveDataSourceItem(title, this.resourceItemDataSource);
    (this.resourceItem as GoogleDriveDataSourceItem).identifier = identifier;
  }
}
