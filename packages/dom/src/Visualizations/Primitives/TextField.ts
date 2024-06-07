import { DataType } from "../../Enums/DataType";
import { TextFilter } from "../../Filters/TextFilter";
import { FieldBase } from "./FieldBase";

export class TextField extends FieldBase<TextFilter> {
    constructor()
    constructor(fieldName: string)
    constructor(fieldName?: string) {
        super(fieldName);
        this.dataType = DataType.String;
    }
}