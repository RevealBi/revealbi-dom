import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { PrimitiveArray } from "../../Core/Serialization/Interfaces/PrimitiveArray";

export class AdHocExpandedElement
{
    @JsonProperty("Path", { type: PrimitiveArray })
    path?: string[];
}