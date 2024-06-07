import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { BoundValueType } from "../Enums/BoundValueType";
import { Bound } from "./Bound";
import { ConditionalFormattingBand } from "./ConditionalFormattingBand";
import { ConditionalFormattingBase } from "./ConditionalFormattingBase";

export class ConditionalFormatting extends ConditionalFormattingBase<ConditionalFormattingBand>
{
    constructor() {
        super();
        this.minimum = new Bound();
        this.minimum.valueType = BoundValueType.LowestValue;
        
        this.maximum = new Bound();
        this.maximum.valueType = BoundValueType.HighestValue;
    }

    @JsonProperty("Minimum")
    minimum: Bound;

    @JsonProperty("Maximum")
    maximum: Bound;

    protected createBand(): ConditionalFormattingBand {
        return new ConditionalFormattingBand();
    }
}