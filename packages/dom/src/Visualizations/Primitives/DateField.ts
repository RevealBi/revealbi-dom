import { DataType } from "../../Enums/DataType"
import { DateTimeFilter } from "../../Filters/DateTimeFilter"
import { FieldBase } from "./FieldBase"
import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { DateTimeFieldSettings } from "./DateTimeFieldSettings";

export class DateField extends FieldBase<DateTimeFilter>
{
    @JsonProperty("Settings", { type: DateTimeFieldSettings })
    settings?: DateTimeFieldSettings;

    constructor()
    constructor(fieldName: string)
    constructor(fieldName?: string)
    {
        super(fieldName);
        this.dataType = DataType.Date;
    }
}
