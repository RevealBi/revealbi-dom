import { GaugeViewType } from "../Enums/GaugeViewType";
import { GaugeVisualizationSettings } from "./GaugeVisualizationSettings";

export class BulletGraphVisualizationSettings extends GaugeVisualizationSettings {
    constructor() {
        super();
        this.viewType = GaugeViewType.BulletGraph;
    }
}