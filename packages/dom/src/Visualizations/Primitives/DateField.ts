import { DataType } from "../../Enums/DataType"
import { DateTimeFilter } from "../../Filters/DateTimeFilter"
import { FieldBase } from "./FieldBase"

export class DateField extends FieldBase<DateTimeFilter>
{
    constructor()
    constructor(fieldName: string)
    constructor(fieldName?: string)
    {
        super(fieldName);
        this.dataType = DataType.Date;
    }
}