import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty"
import { TrendlineType } from "../Enums/TrendlineType";
import { SharedChartVisualizationSettings } from "./SharedChartVisualizationSettings"

/// <summary>
/// This class is the base class for common category chart types such as Column, Bar, Area, Line, Step Area, Step Line, Spline Area, Spline, and Time Series charts.
/// </summary>
export abstract class CategoryChartVisualizationSettings extends SharedChartVisualizationSettings {
    /// <summary>
    /// Gets or sets whether a total (sum) of values will be displayed in the tooltip. Only applied when categories have been added to the visualization.
    /// </summary>
    @JsonProperty("ShowTotalsInTooltip")
    private showTotalsInTooltip: boolean = false;

    /// <summary>
    /// Gets or sets a trendline to apply to the visualization
    /// </summary>
    @JsonProperty("TrendlineType")
    trendline: TrendlineType = TrendlineType.None;
}