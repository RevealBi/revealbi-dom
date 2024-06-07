import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";

//internal
export class JoinCondition
{
    @JsonProperty("LeftFieldName")
    leftFieldName?: string;
    @JsonProperty("RightFieldName")
    rightFieldName?: string;
}