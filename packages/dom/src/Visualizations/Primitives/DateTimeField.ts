import { DataType } from "../../Enums/DataType"
import { DateTimeFilter } from "../../Filters/DateTimeFilter"
import { FieldBase } from "./FieldBase"

export class DateTimeField extends FieldBase<DateTimeFilter>
{
    constructor()
    constructor(fieldName: string)
    constructor(fieldName?: string) {
        super(fieldName);
        this.dataType = DataType.DateTime;
    }
}