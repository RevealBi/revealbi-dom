import { SchemaTypeNames } from "../../Core/Constants/SchemaTypeNames";
import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { NegativeFormatType } from "../Enums/NegativeFormatType";
import { NumberFormattingType } from "../Enums/NumberFormattingType";
import { FormattingBase } from "./FormattingBase";

export class NumberFormatting extends FormattingBase {
    
    constructor() {
        super();
        this.schemaTypeName = SchemaTypeNames.NumberFormattingSpecType;
    }

    @JsonProperty("ApplyMkFormat")
    applyMkFormat: boolean = false;

    @JsonProperty("CurrencySymbol")
    currencySymbol: string = "$";

    @JsonProperty("DecimalDigits")
    decimalDigits: number = 2;

    @JsonProperty("FormatType")
    formatType: NumberFormattingType = NumberFormattingType.Number;

    @JsonProperty("NegativeFormat")
    negativeFormat: NegativeFormatType = NegativeFormatType.MinusSign;

    @JsonProperty("ShowGroupingSeparator")
    showGroupingSeparator: boolean = false;
}