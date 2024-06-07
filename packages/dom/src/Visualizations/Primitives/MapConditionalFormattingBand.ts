import { SchemaTypeNames } from "../../Core/Constants/SchemaTypeNames";
import { Band } from "./Band";

export class MapConditionalFormattingBand extends Band {
    constructor() {
        super();
        this.schemaTypeName = SchemaTypeNames.ConditionalFormattingBandType;
    }
}