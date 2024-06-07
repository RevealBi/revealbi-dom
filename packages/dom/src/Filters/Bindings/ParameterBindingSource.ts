import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { BindingSource } from "./BindingSource";

export class ParameterBindingSource extends BindingSource
{
    @JsonProperty("ParameterName")
    parameterName?:string;
}