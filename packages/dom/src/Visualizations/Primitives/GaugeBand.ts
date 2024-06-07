import { SchemaTypeNames } from "../../Core/Constants/SchemaTypeNames";
import { Band } from "./Band";

export class GaugeBand extends Band {
    constructor() {
        super();
        this.schemaTypeName = SchemaTypeNames.GaugeBandType;
    }
}