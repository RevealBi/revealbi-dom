import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { DataType } from "../../Enums/DataType"
import { NumberFilter } from "../../Filters/NumberFilter"
import { FieldBase } from "./FieldBase"
import { NumberFormatting } from "./NumberFormatting";

export class NumberField extends FieldBase<NumberFilter> {
    constructor()
    constructor(fieldName: string)
    constructor(fieldName?: string) {
        super(fieldName);
        this.dataType = DataType.Number;
    }

    @JsonProperty("Formatting", { type: NumberFormatting })
    formatting?: NumberFormatting;
}