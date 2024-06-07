import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { Bound } from "../Primitives/Bound";
import { GaugeBand } from "../Primitives/GaugeBand";
import { GaugeVisualizationSettingsBase } from "./GaugeVisualizationSettingsBase";

export class GaugeVisualizationSettings extends GaugeVisualizationSettingsBase<GaugeBand> {

    @JsonProperty("Minimum", { type: Bound })
    minimum?: Bound;

    @JsonProperty("Maximum", { type: Bound })
    maximum?: Bound;

    get valueComparisonType(): any {
        return this.bands[0].valueComparisonType;
    }
    set valueComparisonType(value: any) {
        this.bands.forEach((item) => (item.valueComparisonType = value));
    }

    protected createBand(): GaugeBand {
        return new GaugeBand();
    }
}