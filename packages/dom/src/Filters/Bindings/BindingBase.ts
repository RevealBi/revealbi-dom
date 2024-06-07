import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { BindingOperatorType } from "./BindingOperatorType";


export abstract class BindingBase {
    @JsonProperty("Operator")
    operator: BindingOperatorType = BindingOperatorType.Equals;
}
