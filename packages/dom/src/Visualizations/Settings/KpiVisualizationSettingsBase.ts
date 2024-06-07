import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { IndicatorDifferenceMode } from "../Enums/IndicatorDifferenceMode";
import { VisualizationSettings } from "./VisualizationSettings";

export abstract class KpiVisualizationSettingsBase extends VisualizationSettings
{
    /**
     * Gets or sets the mode in which the difference between values will be displayed. As a value, percentage, or both value and percentage.
     */
    @JsonProperty("DifferenceMode")
    differenceMode: IndicatorDifferenceMode = IndicatorDifferenceMode.Percentage;

    /**
     * Gets or sets whether the color f the difference indicator will be Red or Green. If true, the color will be red. Otherwise, green.
     */
    @JsonProperty("PositiveIsRed")
    positiveIsRed: boolean = false;

    /**
     * Gets or sets whether the difference will include the values for the current day.
     */
    @JsonProperty("IncludeToday")
    includeToday: boolean = true;
}