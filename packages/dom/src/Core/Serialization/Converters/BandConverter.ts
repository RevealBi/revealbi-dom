import { ConditionalFormattingBand, TextBand } from "../../../Visualizations/Primitives";
import { SchemaTypeNames } from "../../Constants/SchemaTypeNames";

export function bandConverter(json: any) {
    const bandType = json["_type"];
    switch (bandType) {
        case SchemaTypeNames.GaugeBandType:
            return TextBand; //works for GaugeBand too, just adds the additional Shape property
        case SchemaTypeNames.ConditionalFormattingBandType:
            return ConditionalFormattingBand; //this works for MapConditionalFormattingBand too, it just adds the additional Shape property
        default:
            throw new Error(`Band not supported: ${bandType}`); 
    }
}