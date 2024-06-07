import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { BoundValueType } from "../Enums/BoundValueType";

export class Bound {
    @JsonProperty("ValueType")
    valueType: BoundValueType = BoundValueType.NumberValue;
    @JsonProperty("Value")
    value?: number;
}
