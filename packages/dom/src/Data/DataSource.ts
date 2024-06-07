import { DataSourceProvider } from "../Core/Constants/DataSourceProvider";
import { SchemaTypeNames } from "../Core/Constants/SchemaTypeNames";
import { Guid } from "../Core/Guid";
import { SchemaType } from "../Core/SchemaType";
import { JsonProperty } from "../Core/Serialization/Decorators/JsonProperty";
import { JsonRecord } from "../Core/Serialization/Interfaces/JsonRecord";

export class DataSource extends SchemaType {
    constructor() {
        super();
        this.schemaTypeName = SchemaTypeNames.DataSourceType;
    }

    @JsonProperty("Id") 
    id: string = Guid.newGuid();

    @JsonProperty("Provider") 
    provider: DataSourceProvider = DataSourceProvider.Excel;

    @JsonProperty("Description")    
    title?: string;

    @JsonProperty("Subtitle") 
    subtitle?: string;

    @JsonProperty("Properties", { type: JsonRecord })
    properties?: Record<string, any> = {};
}