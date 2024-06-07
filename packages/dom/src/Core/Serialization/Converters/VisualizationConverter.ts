import { AreaChartVisualization } from "../../../Visualizations/AreaChartVisualization";
import { BarChartVisualization } from "../../../Visualizations/BarChartVisualization";
import { BubbleVisualization } from "../../../Visualizations/BubbleVisualization";
import { BulletGraphVisualization } from "../../../Visualizations/BulletGraphVisualization";
import { CandleStickVisualization } from "../../../Visualizations/CandleStickVisualization";
import { ChoroplethVisualization } from "../../../Visualizations/ChoroplethVisualization";
import { CircularGaugeVisualization } from "../../../Visualizations/CircularGaugeVisualization";
import { ColumnChartVisualization } from "../../../Visualizations/ColumnChartVisualization";
import { ComboChartVisualization } from "../../../Visualizations/ComboChartVisualization";
import { CustomVisualization } from "../../../Visualizations/CustomVisualization";
import { DoughnutChartVisualization } from "../../../Visualizations/DoughnutChartVisualization";
import { FunnelChartVisualization } from "../../../Visualizations/FunnelChartVisualization";
import { GridVisualization } from "../../../Visualizations/GridVisualization";
import { ImageVisualization } from "../../../Visualizations/ImageVisualization";
import { KpiTargetVisualization } from "../../../Visualizations/KpiTargetVisualization";
import { KpiTimeVisualization } from "../../../Visualizations/KpiTimeVisualization";
import { LinearGaugeVisualization } from "../../../Visualizations/LinearGaugeVisualization";
import { LineChartVisualization } from "../../../Visualizations/LineChartVisualization";
import { OHLCVisualization } from "../../../Visualizations/OHLCVisualization";
import { PieChartVisualization } from "../../../Visualizations/PieChartVisualization";
import { PivotVisualization } from "../../../Visualizations/PivotVisualization";
import { RadialVisualization } from "../../../Visualizations/RadialVisualization";
import { ScatterMapVisualization } from "../../../Visualizations/ScatterMapVisualization";
import { ScatterVisualization } from "../../../Visualizations/ScatterVisualization";
import { SparklineVisualization } from "../../../Visualizations/SparklineVisualization";
import { SplineAreaChartVisualization } from "../../../Visualizations/SplineAreaChartVisualization";
import { SplineChartVisualization } from "../../../Visualizations/SplineChartVisualization";
import { StackedAreaChartVisualization } from "../../../Visualizations/StackedAreaChartVisualization";
import { StackedBarChartVisualization } from "../../../Visualizations/StackedBarChartVisualization";
import { StackedColumnChartVisualization } from "../../../Visualizations/StackedColumnChartVisualization";
import { StepAreaChartVisualization } from "../../../Visualizations/StepAreaChartVisualization";
import { StepLineChartVisualization } from "../../../Visualizations/StepLineChartVisualization";
import { TextBoxVisualization } from "../../../Visualizations/TextBoxVisualization";
import { TextViewVisualization } from "../../../Visualizations/TextViewVisualization";
import { TextVisualization } from "../../../Visualizations/TextVisualization";
import { TimeSeriesVisualization } from "../../../Visualizations/TimeSeriesVisualization";
import { TreeMapVisualization } from "../../../Visualizations/TreeMapVisualization";
import { SchemaTypeNames } from "../../Constants/SchemaTypeNames";

export function visualizationConverter(json: any) {
    const visualizationSettings = json["VisualizationSettings"];
    const visualizationType = visualizationSettings["_type"];

    switch (visualizationType) {
        case SchemaTypeNames.AssetVisualizationSettingsType:
            return ImageVisualization;
        case SchemaTypeNames.ChartVisualizationSettingsType:
            return getChartVisualizationType(visualizationSettings);
        case SchemaTypeNames.DiyVisualizationSettingsType:
            return CustomVisualization;
        case SchemaTypeNames.GaugeVisualizationSettingsType:
            return getGaugeVisualizationType(visualizationSettings);
        case SchemaTypeNames.GridVisualizationSettingsType:
            return GridVisualization;
        case SchemaTypeNames.IndicatorVisualizationSettingsType:
            return KpiTimeVisualization;
        case SchemaTypeNames.IndicatorTargetVisualizationSettingsType:
            return KpiTargetVisualization;
        case SchemaTypeNames.PivotVisualizationSettingsType:
            return PivotVisualization;
        case SchemaTypeNames.ScatterMapVisualizationSettingsType:
            return ScatterMapVisualization;
        case SchemaTypeNames.SingleRowVisualizationSettingsType:
            return TextViewVisualization;
        case SchemaTypeNames.SparklineVisualizationSettingsType:
            return SparklineVisualization;
        case SchemaTypeNames.TextBoxVisualizationSettingsType:
            return TextBoxVisualization;
        case SchemaTypeNames.TreeMapVisualizationSettingsType:
            return TreeMapVisualization;
        case SchemaTypeNames.ChoroplethMapVisualizationSettingsType:
            return ChoroplethVisualization;
        default:
            throw new Error(`VisualizationConverter: Visualization not supported: ${visualizationType}`);
    }
}

const getGaugeVisualizationType = (json: any) => {
    const vds = json["ViewType"];
    let type;
    switch (vds) {
        case "BulletGraph":
            type = BulletGraphVisualization;
            break;
        case "Circular":
            type = CircularGaugeVisualization;
            break;
        case "Linear":
            type = LinearGaugeVisualization;
            break;
        case "SingleValue":
            type = TextVisualization;
            break;
        default:
            throw new Error(`VisualizationConverter: Gauge type not supported: ${vds}`);
    }

    return type;
}

const getChartVisualizationType = (json: any): any => {
    const chartType = json["ChartType"];
    let type;
    switch (chartType) {
        case "Area":
            type = AreaChartVisualization;
            break;
        case "Bar":
            type = BarChartVisualization;
            break;
        case "Bubble":
            type = BubbleVisualization;
            break;
        case "Candlestick":
            type = CandleStickVisualization;
            break;
        case "Column":
            type = ColumnChartVisualization;
            break;
        case "Composite":
            type = ComboChartVisualization;
            break;
        case "Doughnut":
            type = DoughnutChartVisualization;
            break;
        case "Funnel":
            type = FunnelChartVisualization;
            break;
        case "Line":
            type = LineChartVisualization;
            break;
        case "Pie":
            type = PieChartVisualization;
            break;
        case "RadialLines":
            type = RadialVisualization;
            break;
        case "Scatter":
            type = ScatterVisualization;
            break;
        case "Spline":
            type = SplineChartVisualization;
            break;
        case "SplineArea":
            type = SplineAreaChartVisualization;
            break;
        case "StackedArea":
            type = StackedAreaChartVisualization;
            break;
        case "StackedBar":
            type = StackedBarChartVisualization;
            break;
        case "StackedColumn":
            type = StackedColumnChartVisualization;
            break;
        case "StepArea":
            type = StepAreaChartVisualization;
            break;
        case "StepLine":
            type = StepLineChartVisualization;
            break;
        case "TimeSeries":
            type = TimeSeriesVisualization;
            break;
        case "OHLC":
            type = OHLCVisualization;
            break;
        default:
            throw new Error(`VisualizationConverter: Chart type not supported: ${chartType}`);
    }

    return type;
}