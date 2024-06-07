import { AreaChartVisualizationSettings } from "../../../Visualizations/Settings/AreaChartVisualizationSettings";
import { AssetVisualizationSettings } from "../../../Visualizations/Settings/AssetVisualizationSettings";
import { BarChartVisualizationSettings } from "../../../Visualizations/Settings/BarChartVisualizationSettings";
import { BubbleVisualizationSettings } from "../../../Visualizations/Settings/BubbleVisualizationSettings";
import { BulletGraphVisualizationSettings } from "../../../Visualizations/Settings/BulletGraphVisualizationSettings";
import { ChoroplethVisualizationSettings } from "../../../Visualizations/Settings/ChoroplethVisualizationSettings";
import { CircularGaugeVisualizationSettings } from "../../../Visualizations/Settings/CircularGaugeVisualizationSettings";
import { ColumnChartVisualizationSettings } from "../../../Visualizations/Settings/ColumnChartVisualizationSettings";
import { ComboChartVisualizationSettings } from "../../../Visualizations/Settings/ComboChartVisualizationSettings";
import { CustomVisualizationSettings } from "../../../Visualizations/Settings/CustomVisualizationSettings";
import { DoughnutChartVisualizationSettings } from "../../../Visualizations/Settings/DoughnutChartVisualizationSettings";
import { FunnelChartVisualizationSettings } from "../../../Visualizations/Settings/FunnelChartVisualizationSettings";
import { GridVisualizationSettings } from "../../../Visualizations/Settings/GridVisualizationSettings";
import { KpiTargetVisualizationSettings } from "../../../Visualizations/Settings/KpiTargetVisualizationSettings";
import { KpiTimeVisualizationSettings } from "../../../Visualizations/Settings/KpiTimeVisualizationSettings";
import { LinearGaugeVisualizationSettings } from "../../../Visualizations/Settings/LinearGaugeVisualizationSettings";
import { LineChartVisualizationSettings } from "../../../Visualizations/Settings/LineChartVisualizationSettings";
import { OHLCVisualizationSettings } from "../../../Visualizations/Settings/OHLCVisualizationSettings";
import { PieChartVisualizationSettings } from "../../../Visualizations/Settings/PieChartVisualizationSettings";
import { PivotVisualizationSettings } from "../../../Visualizations/Settings/PivotVisualizationSettings";
import { RadialVisualizationSettings } from "../../../Visualizations/Settings/RadialVisualizationSettings";
import { ScatterMapVisualizationSettings } from "../../../Visualizations/Settings/ScatterMapVisualizationSettings";
import { ScatterVisualizationSettings } from "../../../Visualizations/Settings/ScatterVisualizationSettings";
import { SingleRowVisualizationSettings } from "../../../Visualizations/Settings/SingleRowVisualizationSettings";
import { SparklineVisualizationSettings } from "../../../Visualizations/Settings/SparklineVisualizationSettings";
import { SplineAreaChartVisualizationSettings } from "../../../Visualizations/Settings/SplineAreaChartVisualizationSettings";
import { SplineChartVisualizationSettings } from "../../../Visualizations/Settings/SplineChartVisualizationSettings";
import { StackedAreaChartVisualizationSettings } from "../../../Visualizations/Settings/StackedAreaChartVisualizationSettings";
import { StackedBarChartVisualizationSettings } from "../../../Visualizations/Settings/StackedBarChartVisualizationSettings";
import { StackedColumnChartVisualizationSettings } from "../../../Visualizations/Settings/StackedColumnChartVisualizationSettings";
import { StepAreaChartVisualizationSettings } from "../../../Visualizations/Settings/StepAreaChartVisualizationSettings";
import { StepLineChartVisualizationSettings } from "../../../Visualizations/Settings/StepLineChartVisualizationSettings";
import { TextBoxVisualizationSettings } from "../../../Visualizations/Settings/TextBoxVisualizationSettings";
import { TextVisualizationSettings } from "../../../Visualizations/Settings/TextVisualizationSettings";
import { TimeSeriesVisualizationSettings } from "../../../Visualizations/Settings/TimeSeriesVisualizationSettings";
import { TreeMapVisualizationSettings } from "../../../Visualizations/Settings/TreeMapVisualizationSettings";
import { SchemaTypeNames } from "../../Constants/SchemaTypeNames";

export function settingConverter(json: any) {
  const settingsType = json["_type"];
  switch (settingsType) {
    case SchemaTypeNames.AssetVisualizationSettingsType:
      return AssetVisualizationSettings;
    case SchemaTypeNames.ChartVisualizationSettingsType:
      return getChartVisualizationType(json);
    case SchemaTypeNames.DiyVisualizationSettingsType:
      return CustomVisualizationSettings;
    case SchemaTypeNames.GaugeVisualizationSettingsType:
      return getGaugeVisualizationType(json);
    case SchemaTypeNames.GridVisualizationSettingsType:
      return GridVisualizationSettings;
    case SchemaTypeNames.IndicatorVisualizationSettingsType:
      return KpiTimeVisualizationSettings;
    case SchemaTypeNames.IndicatorTargetVisualizationSettingsType:
      return KpiTargetVisualizationSettings;
    case SchemaTypeNames.PivotVisualizationSettingsType:
      return PivotVisualizationSettings;
    case SchemaTypeNames.ScatterMapVisualizationSettingsType:
      return ScatterMapVisualizationSettings;
    case SchemaTypeNames.SingleRowVisualizationSettingsType:
      return SingleRowVisualizationSettings;
    case SchemaTypeNames.SparklineVisualizationSettingsType:
      return SparklineVisualizationSettings;
    case SchemaTypeNames.TextBoxVisualizationSettingsType:
      return TextBoxVisualizationSettings;
    case SchemaTypeNames.TreeMapVisualizationSettingsType:
      return TreeMapVisualizationSettings;
    case SchemaTypeNames.ChoroplethMapVisualizationSettingsType:
      return ChoroplethVisualizationSettings;
    default:
      throw new Error(`SettingsConverter: Visualization not supported: ${settingsType}`);
  }
}

const getGaugeVisualizationType = (json: any) => {
  const vds = json["ViewType"];
  let type;
  switch (vds) {
    case "Circular":
      type = CircularGaugeVisualizationSettings;
      break;
    case "Linear":
      type = LinearGaugeVisualizationSettings;
      break;
    case "BulletGraph":
      type = BulletGraphVisualizationSettings;
      break;
    case "SingleValue":
      type = TextVisualizationSettings;
      break;
    default:
      throw new Error(`SettingsConverter: Gauge type not supported: ${vds}`);
  }

  return type;
}

const getChartVisualizationType = (json: any): any => {
  const chartType = json["ChartType"];
  let type;
  switch (chartType) {
    case "Area":
      type = AreaChartVisualizationSettings;
      break;
    case "Bar":
      type = BarChartVisualizationSettings;
      break;
    case "Bubble":
      type = BubbleVisualizationSettings;
      break;
    case "Column":
      type = ColumnChartVisualizationSettings;
      break;
    case "Composite":
      type = ComboChartVisualizationSettings;
      break;
    case "Doughnut":
      type = DoughnutChartVisualizationSettings;
      break;
    case "Funnel":
      type = FunnelChartVisualizationSettings;
      break;
    case "Line":
      type = LineChartVisualizationSettings;
      break;
    case "Pie":
      type = PieChartVisualizationSettings;
      break;
    case "RadialLines":
      type = RadialVisualizationSettings;
      break;
    case "Scatter":
      type = ScatterVisualizationSettings;
      break;
    case "Spline":
      type = SplineChartVisualizationSettings;
      break;
    case "SplineArea":
      type = SplineAreaChartVisualizationSettings;
      break;
    case "StackedArea":
      type = StackedAreaChartVisualizationSettings;
      break;
    case "StackedBar":
      type = StackedBarChartVisualizationSettings;
      break;
    case "StackedColumn":
      type = StackedColumnChartVisualizationSettings;
      break;
    case "StepArea":
      type = StepAreaChartVisualizationSettings;
      break;
    case "StepLine":
      type = StepLineChartVisualizationSettings;
      break;
    case "TimeSeries":
      type = TimeSeriesVisualizationSettings;
      break;
    case "OHLC":
      type = OHLCVisualizationSettings;
      break;
    default:
      throw new Error(`SettingsConverter: Chart type not supported: ${chartType}`);
  }

  return type;
}