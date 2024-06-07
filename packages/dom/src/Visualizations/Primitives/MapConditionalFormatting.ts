import { ConditionalFormattingBase } from "./ConditionalFormattingBase";
import { MapConditionalFormattingBand } from "./MapConditionalFormattingBand";

export class MapConditionalFormatting extends ConditionalFormattingBase<MapConditionalFormattingBand>
{
    protected createBand(): MapConditionalFormattingBand {
        return new MapConditionalFormattingBand();
    }    
}