import { SchemaTypeNames } from "../../Core/Constants/SchemaTypeNames";
import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { BindingSource } from "./BindingSource";

export class FieldBindingSource extends BindingSource
{
    constructor()
    {
        super();
        this.schemaTypeName = SchemaTypeNames.FieldBindingSourceType;
    }

    @JsonProperty("FieldName")
    fieldName?: string;
}