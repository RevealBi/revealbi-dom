import { JsonProperty } from "./Serialization/Decorators/JsonProperty";

export abstract class SchemaType {
    @JsonProperty("_type")
    protected schemaTypeName?: string;
}

