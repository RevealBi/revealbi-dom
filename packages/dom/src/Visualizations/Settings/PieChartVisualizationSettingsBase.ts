import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { LabelDisplayMode } from "../Enums/LabelDisplayMode";
import { ChartVisualizationSettingsBase } from "./ChartVisualizationSettingsBase";

export abstract class PieChartVisualizationSettingsBase extends ChartVisualizationSettingsBase {

    /**
     * Gets or sets if the chart legend is displayed in the RevealView
     */
    @JsonProperty("ShowLegends")
    showLegend: boolean = true;

    /**
     * Gets or sets the how the slice labels are displayed. Display only the values, only the percentages, or both.
     */
    @JsonProperty("LabelDisplayMode")
    sliceLabelDisplay: LabelDisplayMode = LabelDisplayMode.Percentage;

    /**
     * Gets or sets the color index for the visualization's starting color. A zero-based index is used to set colors instead of a color name.
     * For example, an index of 5 would be the 6th color in the color scheme regardless of the theme colors being used.
     */
    @JsonProperty("BrushOffsetIndex")
    startColorIndex?: number;

    /**
     * Gets or sets the percentage threshold in which values are combined into the "Others" category.
     * Supported values include: 0.0 (0%) - show all slices, 1.0 (1%), 2.0 (2%), 3.0 (3%), 4.0 (4%)
     */
    @JsonProperty("OthersSliceThreshold")
    private _othersSliceThreshold: number = 3.0;

    public get OthersSliceThreshold(): number {
        return this._othersSliceThreshold;
    }

    public set OthersSliceThreshold(value: number) {
        this._othersSliceThreshold = this.coerceValue(value);
    }

    private coerceValue(value: number): number {
        let round = Math.round(value);
        if (round <= 0.0) {
            return 0.0;
        }
        if (round <= 4.0) {
            return round;
        }
        return 4.0;
    }
}