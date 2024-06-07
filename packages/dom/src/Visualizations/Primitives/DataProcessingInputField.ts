import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";

export class DataProcessingInputField
{
    @JsonProperty("ResultColumnName")
    resultColumnName?: string;

    @JsonProperty("InputColumnName")
    inputColumnName?: string;

    @JsonProperty("FixedValue")
    fixedValue?: string;
}