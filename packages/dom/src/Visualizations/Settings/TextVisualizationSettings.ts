import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { GaugeViewType } from "../Enums/GaugeViewType";
import { ValueComparisonType } from "../Enums/ValueComparisonType";
import { TextBand } from "../Primitives/TextBand";
import { GaugeVisualizationSettingsBase } from "./GaugeVisualizationSettingsBase";

export class TextVisualizationSettings extends GaugeVisualizationSettingsBase<TextBand>{

    constructor() {
        super();
        this.viewType = GaugeViewType.SingleValue;
        this.upperBand.valueComparisonType = ValueComparisonType.Number;
        this.middleBand.valueComparisonType = ValueComparisonType.Number;
        this.lowerBand.valueComparisonType = ValueComparisonType.Number;
    }

    // Gets or sets whether different formatting is applied to a field depending on the upper, middle, and lower range of values
    @JsonProperty("SingleValueFormattingEnabled")
    conditionalFormattingEnabled: boolean = false;

    protected createBand(): TextBand {
        return new TextBand();
    }
}