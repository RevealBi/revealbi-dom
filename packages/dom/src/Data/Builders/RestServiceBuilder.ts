import { DataSourceIds } from "../../Core/Constants/DataSourceIds";
import { DataSourceProvider } from "../../Core/Constants/DataSourceProvider";
import { Guid } from "../../Core/Guid";
import { DataType } from "../../Enums/DataType";
import { IField } from "../../Visualizations/Interfaces/IField";
import { IFieldDataType } from "../../Visualizations/Interfaces/IFieldDataType";
import { DataSource } from "../DataSource";
import { DataSourceItem } from "../DataSourceItem";
import { ExcelFileType } from "../Enums/ExcelFileType";
import { HeaderType } from "../Enums/HeaderType";
import { ColumnConfig } from "../Primitives/ColumnConfig";

export class RestServiceBuilder {

    private readonly _dataSource: DataSource = { id: DataSourceIds.JSON, provider: DataSourceProvider.JSON, properties: {}, defaultRefreshRate: 0 };
    private readonly _dataSourceItem: DataSourceItem = new DataSourceItem();
    private readonly _resourceItemDataSource: DataSource = { id: Guid.newGuid(), provider: DataSourceProvider.REST, properties: {}, defaultRefreshRate: 0 };
    private readonly _resourceItem: DataSourceItem = new DataSourceItem();

    constructor(uri: string) {
        this._dataSourceItem.dataSource = this._dataSource;
        this._dataSourceItem.dataSourceId = this._dataSource.id;
        this._dataSourceItem.hasTabularData = true;

        this._resourceItemDataSource.properties = {
            _rpUseAnonymousAuthentication: true,
            Url: uri,
            Method: "GET",
            "Result-Type": ".json",
        };

        this._dataSourceItem.resourceItemDataSource = this._resourceItemDataSource;
        this._resourceItem.dataSourceId = this._resourceItemDataSource.id;
    
        this._resourceItem.properties = { Url: uri };
        this._dataSourceItem.resourceItem = this._resourceItem;
    }

    public isAnonymous(isAnonymous: boolean): RestServiceBuilder {
        this._resourceItemDataSource.properties!["_rpUseAnonymousAuthentication"] = isAnonymous;
        return this;
      }
    
      public setFields(fields: IField[]): RestServiceBuilder {
        this._dataSourceItem.fields = [...fields];
    
        this._dataSourceItem.parameters = {
          config: this.buildConfig(fields),
        };
    
        return this;
      }
    
      public setTitle(title: string): RestServiceBuilder {
        this._dataSourceItem.title = title;
        this._resourceItem.title = title;
        this._resourceItemDataSource.title = title;
        return this;
      }
    
      public setSubtitle(subtitle: string): RestServiceBuilder {
        this._dataSourceItem.subtitle = subtitle;
        return this;
      }
    
      public build(): DataSourceItem {
        if (!this._dataSourceItem.fields || this._dataSourceItem.fields.length === 0) {
          throw new Error("You must provide the field definitions for the data source item. Call the setFields function and provide the fields.");
        }
    
        return this._dataSourceItem;
      }
    
      public addHeader(headerType: HeaderType, value: string): RestServiceBuilder {
        const propertyKey = "Headers";
        const headerValue = `${this.addDashesToEnumName(headerType)}=${value}`;
    
        if (!this._resourceItemDataSource.properties![propertyKey]) {
          this._resourceItemDataSource.properties![propertyKey] = [headerValue];
        } else {
          this._resourceItemDataSource.properties![propertyKey].push(headerValue);
        }
    
        return this;
      }
    
      public useCsv(): RestServiceBuilder {
        this.clearJsonConfig();
    
        this._dataSource.id = DataSourceIds.CSV;
        this._dataSource.provider = DataSourceProvider.CSV;
        this._resourceItemDataSource.properties!["Result-Type"] = ".csv";
    
        this._dataSourceItem.dataSourceId = this._dataSource.id;
    
        return this;
      }
    
      public useExcel(sheet: string | null = null, fileType: ExcelFileType = ExcelFileType.Xlsx): RestServiceBuilder {
        this.clearJsonConfig();
    
        this._dataSource.id = DataSourceIds.Excel;
        this._dataSource.provider = DataSourceProvider.MicrosoftExcel;
    
        const fileExt = fileType === ExcelFileType.Xlsx;
        this._resourceItemDataSource.properties!["Result-Type"] = fileExt;
    
        if (sheet) {
          this._dataSourceItem.subtitle = sheet;
    
          if (this._dataSourceItem.properties && this._dataSourceItem.properties["Sheet"]) {
            this._dataSourceItem.properties["Sheet"] = sheet;
          } else {
            this._dataSourceItem.properties = { ...this._dataSourceItem.properties, Sheet: sheet };
          }
        }
    
        this._dataSourceItem.dataSourceId = this._dataSource.id;
    
        return this;
      }
    
      private buildConfig(fields: IField[]): { [key: string]: any } {
        const config: { [key: string]: any } = {};
        const columnConfigs: ColumnConfig[] = [];
    
        for (const field of fields) {
          if (!field) {
            continue;
          }
    
          const columnConfig: ColumnConfig = {
            key: field.fieldName,
          }
    
          const type = ((field as unknown) as IFieldDataType).dataType;
    
          switch (type) {
            case DataType.Number:
              columnConfig.type = 1;
              break;
            case DataType.Date:
              columnConfig.type = 2;
              break;
            case DataType.DateTime:
              columnConfig.type = 3;
              break;
            case DataType.Time:
              columnConfig.type = 4;
              break;
            default:
              columnConfig.type = 0;
          }
    
          columnConfigs.push(columnConfig);
        }
    
        config["iterationDepth"] = 0;
        config["columnsConfig"] = columnConfigs;
    
        return config;
      }
    
      private clearJsonConfig(): void {
        if (this._dataSourceItem.parameters && this._dataSourceItem.parameters["config"]) {
          delete this._dataSourceItem.parameters["config"];
        }
      }
    
      private addDashesToEnumName(name: string): string {
        return name.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
      }

}