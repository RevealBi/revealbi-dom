import { SchemaTypeNames } from "../../Core/Constants/SchemaTypeNames";
import { VisualizationTypes } from "../../Core/Constants/VisualizationTypes";
import { bandConverter } from "../../Core/Serialization/Converters/BandConverter";
import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { BandColor } from "../Enums/BandColor";
import { GaugeViewType } from "../Enums/GaugeViewType";
import { Band } from "../Primitives/Band";
import { VisualizationSettings } from "./VisualizationSettings";

export abstract class GaugeVisualizationSettingsBase<TBand extends Band> extends VisualizationSettings {

    constructor() {
        super();
        this.schemaTypeName = SchemaTypeNames.GaugeVisualizationSettingsType;
        this.visualizationType = VisualizationTypes.GAUGE;

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

    upperBand: TBand;
    middleBand: TBand;
    lowerBand: TBand;

    @JsonProperty("ViewType")
    protected viewType: GaugeViewType = GaugeViewType.Linear;

    @JsonProperty("GaugeBands", { converter: bandConverter})
    protected bands: TBand[] = [];

    protected abstract createBand() : TBand;
}