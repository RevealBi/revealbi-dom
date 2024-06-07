import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { DataType } from "../../Enums/DataType";

export class DataProcessingOutputField
{
    @JsonProperty("OutputColumnName")
    outputColumnName?: string;

    @JsonProperty("ResultColumnName")
    resultColumnName?: string;   

    @JsonProperty("DataType")
    dataType: DataType = DataType.String;

    @JsonProperty("FeatureName")
    featureName?: string;

    @JsonProperty("IsBoolean")
    isBoolean: boolean = false;

    @JsonProperty("ReferenceColumn")
    referenceColumn?: string;
}