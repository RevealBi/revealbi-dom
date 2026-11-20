import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { DateTimeFieldSettings } from "./DateTimeFieldSettings";
import { DateFormatting } from "./DateFormatting";
import { DataType } from "../../Enums/DataType"
import { DateTimeFilter } from "../../Filters/DateTimeFilter"
import { FieldBase } from "./FieldBase"

export class DateTimeField extends FieldBase<DateTimeFilter>
{
    @JsonProperty("Settings", { type: DateTimeFieldSettings })
    settings?: DateTimeFieldSettings;

    @JsonProperty("Formatting", { type: DateFormatting })
    formatting?: DateFormatting;

    constructor()
    constructor(fieldName: string)
    constructor(fieldName?: string) {
        super(fieldName);
        this.dataType = DataType.DateTime;
    }
}