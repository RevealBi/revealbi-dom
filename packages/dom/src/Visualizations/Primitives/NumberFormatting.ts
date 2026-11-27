import { SchemaTypeNames } from "../../Core/Constants/SchemaTypeNames";
import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { readUnmodeledJson } from "../../Core/Serialization/JsonConvert";
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

    // Older dashboards have the boolean ApplyMkFormat instead of MKFormat; Reveal reads it only when MKFormat is missing.
    private [readUnmodeledJson](json: Record<string, any>) {
        if (!json.hasOwnProperty("MKFormat") && json["ApplyMkFormat"] === true) {
            this.largeNumberFormat = LargeNumberFormat.Auto;
        }
    }
}