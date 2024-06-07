import { SchemaType } from "../../Core/SchemaType";
import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { IDataField } from "../Interfaces/IDataField";

export abstract class DataField extends SchemaType implements IDataField {

    constructor(fieldName?: string) {
        super();
        this.fieldName = fieldName || "";
    }

    @JsonProperty("FieldName")
    fieldName?: string;

    @JsonProperty("Description")
    description?: string;
}
