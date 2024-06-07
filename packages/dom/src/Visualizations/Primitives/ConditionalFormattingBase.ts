import { bandConverter } from "../../Core/Serialization/Converters/BandConverter";
import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { BandColor } from "../Enums/BandColor";
import { Band } from "./Band";

export abstract class ConditionalFormattingBase<TBand extends Band> {

    constructor() {

        this.upperBand = this.createBand();
        this.middleBand = this.createBand();
        this.lowerBand = this.createBand();

        this.upperBand.color = BandColor.Green;
        this.upperBand.value = 80.0;
        this.middleBand.color = BandColor.Yellow;
        this.middleBand.value = 50.0;
        this.lowerBand.color = BandColor.Red;

        this.bands = [this.upperBand, this.middleBand, this.lowerBand];
    }

    @JsonProperty("Bands", { converter: bandConverter})
    private bands: TBand[] = [];

    upperBand: TBand;
    middleBand: TBand;
    lowerBand: TBand;

    get valueComparisonType(): any {
        return this.bands[0].valueComparisonType;
    }
    set valueComparisonType(value: any) {
        this.bands.forEach((item) => (item.valueComparisonType = value));
    }

    protected abstract createBand() : TBand;
}