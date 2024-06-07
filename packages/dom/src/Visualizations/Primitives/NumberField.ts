import { DataType } from "../../Enums/DataType"
import { NumberFilter } from "../../Filters/NumberFilter"
import { FieldBase } from "./FieldBase"

export class NumberField extends FieldBase<NumberFilter>
{
    constructor()
    constructor(fieldName: string)
    constructor(fieldName?: string) {
        super(fieldName);
        this.dataType = DataType.Number;
    }
}