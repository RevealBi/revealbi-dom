import { GaugeViewType } from "../Enums/GaugeViewType";
import { GaugeVisualizationSettings } from "./GaugeVisualizationSettings";

export class LinearGaugeVisualizationSettings extends GaugeVisualizationSettings
{
    constructor()
    {
        super();
        this.viewType = GaugeViewType.Linear;
    }
}