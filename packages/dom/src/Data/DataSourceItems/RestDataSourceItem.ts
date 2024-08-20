import { DataSourceProvider } from "../../Core/Constants/DataSourceProvider";
import { DataType } from "../../Enums";
import { IField, IFieldDataType } from "../../Visualizations";
import { DataSource } from "../DataSource";
import { DataSourceItem } from "../DataSourceItem";
import { CsvDataSource, ExcelDataSource, JsonDataSource } from "../DataSources";
import { ExcelFileType, HeaderType } from "../Enums";
import { ColumnConfig } from "../Primitives";

export class RestDataSourceItem extends DataSourceItem {
    private _internalDataSource: DataSource;

    constructor(title: string);
    constructor(title: string, uri: string);
    constructor(title: string, uri: string, dataSource: DataSource);
    constructor(title: string, dataSource: DataSource);
    constructor(title: string, uriOrDataSource?: string | DataSource, dataSource?: DataSource) {
        super(title, new JsonDataSource());
        this.initializeResourceItem(title);
        if (typeof uriOrDataSource === 'string') {
            this._internalDataSource = dataSource ?? new DataSource();
            this.uri = uriOrDataSource;
        } else {
            this._internalDataSource = uriOrDataSource ?? new DataSource();
        }
        this.updateResourceItemDataSource(this._internalDataSource);
    }

    get isAnonymous(): boolean {
        return this.resourceItemDataSource?.properties["_rpUseAnonymousAuthentication"];
    }
    set isAnonymous(value: boolean) {
        if (this.resourceItemDataSource) this.resourceItemDataSource.properties["_rpUseAnonymousAuthentication"] = value;
    }

    get uri(): string {
        return this.resourceItem?.properties["Url"];
    }
    set uri(value: string) {
        if (this.resourceItem) this.resourceItem.properties["Url"] = value;
        if (this.resourceItemDataSource) this.resourceItemDataSource.properties["Url"] = value;
    }

    addHeader(headerType: HeaderType, value: string): void {
        if (!this.resourceItemDataSource) return;

        const propertyKey = "Headers";
        const headerValue = `${this.addDashesToEnumName(HeaderType[headerType])}=${value}`;

        if (!this.resourceItemDataSource.properties[propertyKey]) {
            this.resourceItemDataSource.properties[propertyKey] = [headerValue];
        } else {
            const headers = this.resourceItemDataSource.properties[propertyKey] as string[];
            headers.push(headerValue);
        }
    }

    useCsv(): void {
        this.clearJsonConfig();
        this.dataSource = new CsvDataSource();
        if (this.resourceItemDataSource) this.resourceItemDataSource.properties["Result-Type"] = ".csv";
    }

    useExcel(sheet?: string, fileType: ExcelFileType = ExcelFileType.Xlsx): void {
        this.clearJsonConfig();
        this.dataSource = new ExcelDataSource();

        const fileExt = fileType === ExcelFileType.Xlsx ? ".xlsx" : ".xls";
        if (this.resourceItemDataSource) this.resourceItemDataSource.properties["Result-Type"] = fileExt;

        if (sheet) {
            this.properties["Sheet"] = sheet;
        }
    }

    protected initializeResourceItem(title: string): void {
        this.resourceItemDataSource = new DataSource();
        this.resourceItemDataSource.provider = DataSourceProvider.REST;

        this.resourceItem = new DataSourceItem();
        this.resourceItem.dataSource = this.resourceItemDataSource,
        this.resourceItem.dataSourceId = this.resourceItemDataSource.id,
        this.resourceItem.title = title,

        this.resourceItemDataSource = this.resourceItemDataSource;
        this.resourceItem = this.resourceItem;
    }

    protected override onFieldsPropertyChanged(fields: IField[]): void {
        if (this.parameters) this.parameters["config"] = this.buildConfig(fields);
    }

    private updateResourceItemDataSource(dataSource: DataSource): void {
        if (!this.resourceItemDataSource) return;

        this.resourceItemDataSource.id = dataSource.id;
        this.resourceItemDataSource.title = dataSource.title ?? this.resourceItem?.title;
        this.resourceItemDataSource.subtitle = dataSource.subtitle ?? this.resourceItem?.subtitle;
        if (this.resourceItem) this.resourceItem.dataSourceId = this.resourceItemDataSource.id;
    }

    private buildConfig(fields: IField[]): Record<string, any> {
        const config: Record<string, any> = {};
        const columnConfigs: ColumnConfig[] = [];

        for (const field of fields) {
            if (!field) continue;

            const columnConfig = new ColumnConfig();
            columnConfig.key = field.fieldName;
            if ((field as any).dataType === DataType.Number) {
                columnConfig.type = 1;
            } else if ((field as any).dataType === DataType.Date) {
                columnConfig.type = 2;
            } else if ((field as any).dataType === DataType.DateTime) {
                columnConfig.type = 3;
            } else if ((field as any).dataType === DataType.Time) {
                columnConfig.type = 4;
            } else {
                columnConfig.type = 0;
            }
            columnConfigs.push(columnConfig);
        }

        config["iterationDepth"] = 0;
        config["columnsConfig"] = columnConfigs;
        return config;
    }

    private clearJsonConfig(): void {
        if (this.parameters && this.parameters["config"]) {
            delete this.parameters["config"];
        }
    }

    private addDashesToEnumName(name: string): string {
        return name.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '');
    }
}
