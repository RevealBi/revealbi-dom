import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { DataType } from "../../Enums/DataType"
import { TimeFilter } from "../../Filters/TimeFilter"
import { DateFormatting } from "./DateFormatting";
import { FieldBase } from "./FieldBase"

export class TimeField extends FieldBase<TimeFilter> {
    @JsonProperty("Formatting", { type: DateFormatting })
    formatting?: DateFormatting;

    constructor()
    constructor(fieldName: string)
    constructor(fieldName?: string) {
        super(fieldName);
        this.dataType = DataType.Time;
    }
}