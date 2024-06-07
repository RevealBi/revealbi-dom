import { SchemaTypeNames } from "../../Core/Constants/SchemaTypeNames";
import { ShapeBand } from "./ShapeBand";

export class TextBand extends ShapeBand
{
    constructor()
    {
        super();
        this.schemaTypeName = SchemaTypeNames.GaugeBandType;
    }
}