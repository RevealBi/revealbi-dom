import { DataSourceIds } from "../../Core/Constants/DataSourceIds";
import { DataSourceProvider } from "../../Core/Constants/DataSourceProvider";
import { DataSource } from "../DataSource";

export class ExcelDataSource extends DataSource {
    constructor() {
        super();
        this.id = DataSourceIds.Excel;
        this.provider = DataSourceProvider.MicrosoftExcel;
    }
}
