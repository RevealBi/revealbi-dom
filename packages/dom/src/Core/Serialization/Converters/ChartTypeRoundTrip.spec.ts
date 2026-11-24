import { describe, expect, it } from "vitest";
import {
    AreaChartVisualization,
    AreaChartVisualizationSettings,
    BarChartVisualization,
    BarChartVisualizationSettings,
    BubbleVisualization,
    BubbleVisualizationSettings,
    CandleStickVisualization,
    CandleStickVisualizationSettings,
    ColumnChartVisualization,
    ColumnChartVisualizationSettings,
    ComboChartVisualization,
    ComboChartVisualizationSettings,
    DataSourceItem,
    DoughnutChartVisualization,
    DoughnutChartVisualizationSettings,
    FunnelChartVisualization,
    FunnelChartVisualizationSettings,
    IVisualization,
    LineChartVisualization,
    LineChartVisualizationSettings,
    OHLCVisualization,
    OHLCVisualizationSettings,
    PieChartVisualization,
    PieChartVisualizationSettings,
    RadialVisualization,
    RadialVisualizationSettings,
    RdashDocument,
    ScatterVisualization,
    ScatterVisualizationSettings,
    SplineAreaChartVisualization,
    SplineAreaChartVisualizationSettings,
    SplineChartVisualization,
    SplineChartVisualizationSettings,
    StackedAreaChartVisualization,
    StackedAreaChartVisualizationSettings,
    StackedBarChartVisualization,
    StackedBarChartVisualizationSettings,
    StackedColumnChartVisualization,
    StackedColumnChartVisualizationSettings,
    StepAreaChartVisualization,
    StepAreaChartVisualizationSettings,
    StepLineChartVisualization,
    StepLineChartVisualizationSettings,
    TextField,
    TimeSeriesVisualization,
    TimeSeriesVisualizationSettings,
} from "../../../index";
import { RdashChartType } from "../../../Visualizations/Enums/ChartType";

type VisualizationType = new (title: string, dataSourceItem: DataSourceItem) => IVisualization;
type SettingsType = new () => object;

// Typed by RdashChartType, so a chart type added to the enum without a row here doesn't compile.
const chartTypes: Record<RdashChartType, [VisualizationType, SettingsType]> = {
    [RdashChartType.Area]: [AreaChartVisualization, AreaChartVisualizationSettings],
    [RdashChartType.Bar]: [BarChartVisualization, BarChartVisualizationSettings],
    [RdashChartType.Bubble]: [BubbleVisualization, BubbleVisualizationSettings],
    [RdashChartType.Candlestick]: [CandleStickVisualization, CandleStickVisualizationSettings],
    [RdashChartType.Column]: [ColumnChartVisualization, ColumnChartVisualizationSettings],
    [RdashChartType.Composite]: [ComboChartVisualization, ComboChartVisualizationSettings],
    [RdashChartType.Doughnut]: [DoughnutChartVisualization, DoughnutChartVisualizationSettings],
    [RdashChartType.Funnel]: [FunnelChartVisualization, FunnelChartVisualizationSettings],
    [RdashChartType.Line]: [LineChartVisualization, LineChartVisualizationSettings],
    [RdashChartType.OHLC]: [OHLCVisualization, OHLCVisualizationSettings],
    [RdashChartType.Pie]: [PieChartVisualization, PieChartVisualizationSettings],
    [RdashChartType.RadialLines]: [RadialVisualization, RadialVisualizationSettings],
    [RdashChartType.Scatter]: [ScatterVisualization, ScatterVisualizationSettings],
    [RdashChartType.Spline]: [SplineChartVisualization, SplineChartVisualizationSettings],
    [RdashChartType.SplineArea]: [SplineAreaChartVisualization, SplineAreaChartVisualizationSettings],
    [RdashChartType.StackedArea]: [StackedAreaChartVisualization, StackedAreaChartVisualizationSettings],
    [RdashChartType.StackedBar]: [StackedBarChartVisualization, StackedBarChartVisualizationSettings],
    [RdashChartType.StackedColumn]: [StackedColumnChartVisualization, StackedColumnChartVisualizationSettings],
    [RdashChartType.StepArea]: [StepAreaChartVisualization, StepAreaChartVisualizationSettings],
    [RdashChartType.StepLine]: [StepLineChartVisualization, StepLineChartVisualizationSettings],
    [RdashChartType.TimeSeries]: [TimeSeriesVisualization, TimeSeriesVisualizationSettings],
};

function dataSource(): DataSourceItem {
    const data = new DataSourceItem("Data");
    data.fields = [new TextField("Category")];
    return data;
}

describe("chart type round trip", () => {
    it.each(Object.entries(chartTypes))("loads a saved %s chart", (chartType, [visualizationType, settingsType]) => {
        const document = new RdashDocument("Charts");
        document.visualizations = [new visualizationType("Chart", dataSource())];

        const json = document.toJsonString();
        expect(JSON.parse(json).Widgets[0].VisualizationSettings.ChartType).toBe(chartType);

        const loaded = RdashDocument.loadFromJson(json).visualizations[0] as any;
        expect(loaded.constructor).toBe(visualizationType);
        expect(loaded.settings.constructor).toBe(settingsType);
    });
});
