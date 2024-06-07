import { SchemaTypeNames } from "../../Core/Constants/SchemaTypeNames";
import { ShapeBand } from "./ShapeBand";

export class ConditionalFormattingBand extends ShapeBand
{
    constructor()
    {
        super();
        this.schemaTypeName = SchemaTypeNames.ConditionalFormattingBandType;
    }
}