import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { SharedChartVisualizationSettings } from "./SharedChartVisualizationSettings";

export abstract class StackedVisualizationSettingsBase extends SharedChartVisualizationSettings
{
    /**
     * Gets or sets whether to override the 0-100 default scale and visualize the percentage distribution of the values.
     */
    @JsonProperty("IsPercentageDistributed")
    isPercentageDistributed?: boolean;

    //todo: is this used?
    /**
     * Gets or sets whether a total (sum) of values will be displayed in the tooltip. Only applied when categories have been added to the visualization.
     */
    // @JsonProperty("ShowTotalsInTooltip")
    // showTotalsInTooltip: boolean = false;
}