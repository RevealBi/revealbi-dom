import { SchemaType } from "../Core/SchemaType";
import { JsonProperty } from "../Core/Serialization/Decorators/JsonProperty";

export class DateFilterValue extends SchemaType {    
    @JsonProperty("value")
    value: string = "";
}