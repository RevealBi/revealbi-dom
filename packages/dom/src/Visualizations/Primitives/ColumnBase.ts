import { SchemaType } from "../../Core/SchemaType";
import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { ColumnAxis } from "./ColumnAxis";

export abstract class ColumnBase extends SchemaType {    
    
    /**
     * Gets or sets the axis of the column. Default value is null.
     */
    @JsonProperty("Axis", { type: ColumnAxis })
    private axis?: ColumnAxis;
}