import { SchemaTypeNames } from "../../Core/Constants/SchemaTypeNames";
import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { FieldSettings } from "./FieldSettings";

export class DateTimeFieldSettings extends FieldSettings
{
    constructor()
    {
        super();
        this.schemaTypeName = SchemaTypeNames.DateTimeFieldSettingsType;
    }

    @JsonProperty("DateFiscalYearStartMonth")    
    dateFiscalYearStartMonth: number = 0;
    
    @JsonProperty("DisplayInLocalTimeZone")    
    displayInLocalTimeZone: boolean = false;
}