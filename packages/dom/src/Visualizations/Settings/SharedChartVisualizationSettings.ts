import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { RdashChartType } from "../Enums/ChartType";
import { YAxisVisualizationSettings } from "./YAxisVisualizationSettings";

/// <summary>
/// This class provides properties that are used by the Column, Bar, Stack Column, Stacked Bar, Stacked Area, Area, Line, Step Area, Step Line, Spline Area, Spline, and Time Series charts.
/// </summary>
export abstract class SharedChartVisualizationSettings extends YAxisVisualizationSettings {
    /// <summary>
    /// Gets or sets a value that determines if the chart will automatcially rotate labels
    /// </summary>
    @JsonProperty("AutomaticLabelRotation")
    automaticLabelRotation: boolean = false;

    /// <summary>
    /// Gets or sets a values that will sync the axis to the visible range.
    /// </summary>
    @JsonProperty("SyncAxisVisibleRange")
    syncAxis: boolean = false;

    /// <summary>
    /// Gets a value that represents the zoom level of the chart. Zoom level ranges from 0.0 (0% zoom) to 1.0 (100% zoom).
    /// </summary>
    get zoomLevel() {
        if (this.chartType == RdashChartType.Bar || this.chartType == RdashChartType.StackedBar) {
            return this.zoomScaleVertical;
        }

        return this.zoomScaleHorizontal;
    }

    /// <summary>
    /// Sets a value that represents the zoom level of the chart. Zoom level ranges from 0.0 (0% zoom) to 1.0 (100% zoom).
    /// </summary>
    set zoomLevel(value: number) {
        if (this.chartType == RdashChartType.Bar || this.chartType == RdashChartType.StackedBar) {
            this.zoomScaleVertical = this.coerceValue(value);
        }

        else {
            this.zoomScaleHorizontal = this.coerceValue(value);
        }
    }

    @JsonProperty("ZoomScaleHorizontal")
    private zoomScaleHorizontal: number = 1;

    @JsonProperty("ZoomScaleVertical")
    private zoomScaleVertical: number = 1;

    private coerceValue(value: number) {
        if (value > 1)
            return 1;
        else if (value < 0)
            return 0;
        else
            return value;
    }
}