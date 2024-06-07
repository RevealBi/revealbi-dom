import { SchemaTypeNames } from "../../Core/Constants/SchemaTypeNames";
import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { ColumnBase } from "./ColumnBase";

export class TabularColumn extends ColumnBase
{
    constructor()
    constructor(fieldName: string)
    constructor(fieldName?: string)
    {
        super();
        this.schemaTypeName = SchemaTypeNames.TabularColumnSpecType;
        this.fieldName = fieldName;
    }
    
    /**
     * Gets or sets the field name.
     */
    @JsonProperty("FieldName")
    fieldName?: string;
}