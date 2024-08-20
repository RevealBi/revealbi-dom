import { DataSourceProvider } from "../../Core/Constants/DataSourceProvider";
import { DataSource } from "../DataSource";

export class MicrosoftSharePointDataSource extends DataSource {
    constructor()
    constructor(title: string)
    constructor(title: string, subtitle: string)
    constructor(title: string = "", subtitle: string = "") {
        super(title, subtitle);
        this.provider = DataSourceProvider.MicrosoftSharePoint;
    }
}
