import { GaugeViewType } from "../Enums/GaugeViewType";
import { GaugeVisualizationSettings } from "./GaugeVisualizationSettings";

export class CircularGaugeVisualizationSettings extends GaugeVisualizationSettings
{
    constructor()
    {
        super();
        this.viewType = GaugeViewType.Circular;
    }
}