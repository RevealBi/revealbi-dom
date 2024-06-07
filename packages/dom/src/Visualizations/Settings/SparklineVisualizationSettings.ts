import { SchemaTypeNames } from "../../Core/Constants/SchemaTypeNames";
import { VisualizationTypes } from "../../Core/Constants/VisualizationTypes";
import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { IndicatorVisualizationType } from "../Enums/IndicatorVisualizationType";
import { SparklineAggregationType } from "../Enums/SparklineAggregationType";
import { SparklineChartType } from "../Enums/SparklineChartType";
import { SparklineVisualizationDataSpec } from "../VisualizationSpecs/SparklineVisualizationDataSpec";
import { GridVisualizationSettingsBase } from "./GridVisualizationSettingsBase";

export class SparklineVisualizationSettings extends GridVisualizationSettingsBase {
    constructor() {
        super();
        this.schemaTypeName = SchemaTypeNames.SparklineVisualizationSettingsType;
        this.visualizationType = VisualizationTypes.SPARKLINE;
    }

    _visualizationDataSpec!: SparklineVisualizationDataSpec; //todo: get from ctor

    /// Gets or sets the chart type to use for the sparkline visualization.
    @JsonProperty("ChartType")
    chartType: SparklineChartType = SparklineChartType.Line;

    /// Gets or sets the number of days, months, or years to use for aggregating the data.
    public get numberOfPeriods(): number {
        return this._visualizationDataSpec.numberOfPeriods;
    }
    public set numberOfPeriods(value: number) {
        this._visualizationDataSpec.numberOfPeriods = value;
    }

    /// Gets or sets the aggregation type to use when aggregating the data.
    public get aggregationType(): SparklineAggregationType {
        return this.convertIndicatorVisualizationTypeToSparklineAggregationType(this._visualizationDataSpec.indicatorType);
    }
    public set aggregationType(value: SparklineAggregationType) {
        this._visualizationDataSpec.indicatorType = this.convertSparklineAggregationTypeToIndicatorVisualizationType(value);
    }

    /// Gets or sets whether a positive difference will be displayed with a red color. When false, green is used.
    @JsonProperty("PositiveIsRed")
    positiveIsRed: boolean = false;

    /// Gets or sets whether the grid will display columns representing the last two values in the data set.
    @JsonProperty("ShowLastTwoValues")
    showLastTwoValues: boolean = true;

    /// Gets or sets whether the grid will display a column representing the difference between the last two values as a percentage.
    @JsonProperty("ShowDifference")
    showDifference: boolean = true;

    private convertIndicatorVisualizationTypeToSparklineAggregationType(indicatorVisualizationType: IndicatorVisualizationType): SparklineAggregationType {
        switch (indicatorVisualizationType) {
            case IndicatorVisualizationType.LastDays:
                return SparklineAggregationType.Days;
            case IndicatorVisualizationType.LastMonths:
                return SparklineAggregationType.Months;
            default:
                return SparklineAggregationType.Years;
        }
    }

    private convertSparklineAggregationTypeToIndicatorVisualizationType(sparklineIndicatorType: SparklineAggregationType): IndicatorVisualizationType {
        switch (sparklineIndicatorType) {
            case SparklineAggregationType.Days:
                return IndicatorVisualizationType.LastDays;
            case SparklineAggregationType.Months:
                return IndicatorVisualizationType.LastMonths;
            default:
                return IndicatorVisualizationType.LastYears;
        }
    }
}