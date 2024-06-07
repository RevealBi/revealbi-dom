import { SchemaTypeNames } from "../../Core/Constants/SchemaTypeNames";
import { DimensionDataField } from "./DimensionDataField";

export class TextDataField extends DimensionDataField {

    constructor()
    constructor(fieldName: string)
    constructor(fieldName?: string) {
        super(fieldName);
        this.schemaTypeName = SchemaTypeNames.SummarizationRegularFieldType;
    }
}