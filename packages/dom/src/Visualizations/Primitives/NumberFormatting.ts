import { SchemaTypeNames } from "../../Core/Constants/SchemaTypeNames";
import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { LargeNumberFormat } from "../Enums";
import { NegativeFormatType } from "../Enums/NegativeFormatType";
import { NumberFormattingType } from "../Enums/NumberFormattingType";
import { FormattingBase } from "./FormattingBase";

export class NumberFormatting extends FormattingBase {
    
    constructor() {
        super();
        this.schemaTypeName = SchemaTypeNames.NumberFormattingSpecType;
    }

    @JsonProperty("CurrencySymbol")
    currencySymbol: string = "$";

    @JsonProperty("DecimalDigits")
    decimalDigits: number = 2;

    @JsonProperty("FormatType")
    formatType: NumberFormattingType = NumberFormattingType.Number;

    @JsonProperty("MKFormat")
    largeNumberFormat: LargeNumberFormat = LargeNumberFormat.None;

    @JsonProperty("NegativeFormat")
    negativeFormat: NegativeFormatType = NegativeFormatType.MinusSign;

    @JsonProperty("ShowGroupingSeparator")
    showGroupingSeparator: boolean = false;

    @JsonProperty("ShowDataLabelsInChart")
    showDataLabels: boolean = true;
}