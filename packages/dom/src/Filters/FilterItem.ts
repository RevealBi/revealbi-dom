import { JsonProperty } from "../Core/Serialization/Decorators/JsonProperty";
import { JsonRecord } from "../Core/Serialization/Interfaces/JsonRecord";
import { PrimitiveArray } from "../Core/Serialization/Interfaces/PrimitiveArray";

export class FilterItem {

    @JsonProperty("FieldValues", { type: JsonRecord })
    fieldValues?: Record<string, any>;

    @JsonProperty("ExpansionPath", { type: PrimitiveArray })
    expansionPath: string[] = [];
}