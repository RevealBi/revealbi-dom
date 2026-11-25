import { DataSourceProvider } from "../Core/Constants/DataSourceProvider";
import { SchemaTypeNames } from "../Core/Constants/SchemaTypeNames";
import { Guid } from "../Core/Guid";
import { SchemaType } from "../Core/SchemaType";
import { JsonProperty } from "../Core/Serialization/Decorators/JsonProperty";
import { JsonRecord } from "../Core/Serialization/Interfaces/JsonRecord";

export class DataSource extends SchemaType {

    constructor()
    constructor(title: string)
    constructor(title: string, subtitle: string)
    constructor(title: string = "", subtitle: string = "") {
        super();
        this.schemaTypeName = SchemaTypeNames.DataSourceType;
        this.title = title;
        this.subtitle = subtitle;
    }

    @JsonProperty("Id") 
    id: string = Guid.newGuid();

    @JsonProperty("Provider") 
    provider: DataSourceProvider = DataSourceProvider.MicrosoftExcel;

    @JsonProperty("Description")    
    title: string;

    @JsonProperty("Subtitle") 
    subtitle: string;

    @JsonProperty("Properties", { type: JsonRecord })
    properties: Record<string, any> = {};

    @JsonProperty("Settings", { type: JsonRecord })
    settings?: Record<string, any>;

    get defaultRefreshRate(): number | undefined {
        return this.settings?.["DefaultRefreshRate"];
    }
    set defaultRefreshRate(value: number | undefined) {
        const settings: Record<string, any> = { ...this.settings, DefaultRefreshRate: value };
        if (value === undefined) {
            delete settings["DefaultRefreshRate"];
        }
        this.settings = Object.keys(settings).length > 0 ? settings : undefined;
    }

    copySettingsFrom(source: DataSource): void {
        if (source.settings) {
            this.settings = { ...source.settings };
        }
    }
}
