import { DataType } from "../../Enums/DataType"
import { TimeFilter } from "../../Filters/TimeFilter"
import { FieldBase } from "./FieldBase"

export class TimeField extends FieldBase<TimeFilter> {
    constructor()
    constructor(fieldName: string)
    constructor(fieldName?: string) {
        super(fieldName);
        this.dataType = DataType.Time;
    }
}