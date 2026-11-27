import { describe, expect, it } from "vitest";
import {
    AreaChartVisualization,
    BarChartVisualization,
    BubbleVisualization,
    CandleStickVisualization,
    ColumnChartVisualization,
    ComboChartVisualization,
    DataSourceItem,
    GridLinesMode,
    IVisualization,
    LineChartVisualization,
    OHLCVisualization,
    RdashDocument,
    ScatterVisualization,
    SplineAreaChartVisualization,
    SplineChartVisualization,
    StackedAreaChartVisualization,
    StackedBarChartVisualization,
    StackedColumnChartVisualization,
    StepAreaChartVisualization,
    StepLineChartVisualization,
    TextField,
    TimeSeriesVisualization,
} from "../../index";
import { RdashChartType } from "../Enums/ChartType";

type VisualizationType = new (title: string, dataSourceItem: DataSourceItem) => IVisualization;

// The charts Reveal's editor offers grid lines for: every chart except Pie, Doughnut, Funnel and Radial.
// Typed by RdashChartType, so a chart type added to the enum without a row here doesn't compile.
const chartTypes: Record<Exclude<RdashChartType, RdashChartType.Doughnut | RdashChartType.Funnel | RdashChartType.Pie | RdashChartType.RadialLines>, VisualizationType> = {
    [RdashChartType.Area]: AreaChartVisualization,
    [RdashChartType.Bar]: BarChartVisualization,
    [RdashChartType.Bubble]: BubbleVisualization,
    [RdashChartType.Candlestick]: CandleStickVisualization,
    [RdashChartType.Column]: ColumnChartVisualization,
    [RdashChartType.Composite]: ComboChartVisualization,
    [RdashChartType.Line]: LineChartVisualization,
    [RdashChartType.OHLC]: OHLCVisualization,
    [RdashChartType.Scatter]: ScatterVisualization,
    [RdashChartType.Spline]: SplineChartVisualization,
    [RdashChartType.SplineArea]: SplineAreaChartVisualization,
    [RdashChartType.StackedArea]: StackedAreaChartVisualization,
    [RdashChartType.StackedBar]: StackedBarChartVisualization,
    [RdashChartType.StackedColumn]: StackedColumnChartVisualization,
    [RdashChartType.StepArea]: StepAreaChartVisualization,
    [RdashChartType.StepLine]: StepLineChartVisualization,
    [RdashChartType.TimeSeries]: TimeSeriesVisualization,
};
const charts = Object.entries(chartTypes);

function chartDocument(visualizationType: VisualizationType): RdashDocument {
    const data = new DataSourceItem("Data");
    data.fields = [new TextField("Category")];
    const document = new RdashDocument("Charts");
    document.visualizations = [new visualizationType("Chart", data)];
    return document;
}

describe("chart grid lines mode", () => {
    it.each(charts)("keeps a %s chart's grid lines through a round trip", (_, visualizationType) => {
        // Reveal defaults GridLinesMode to None, so dropping it on load and save removed the chart's grid lines (#94).
        const json: any = chartDocument(visualizationType).toJson();
        json.Widgets[0].VisualizationSettings.GridLinesMode = "Horizontal";

        const saved: any = RdashDocument.loadFromJson(JSON.stringify(json)).toJson();

        expect(saved.Widgets[0].VisualizationSettings.GridLinesMode).toBe("Horizontal");
    });

    it.each(charts)("writes the grid lines set on a %s chart", (_, visualizationType) => {
        const document = chartDocument(visualizationType);
        expect((document.visualizations[0] as any).settings.gridLinesMode).toBe(GridLinesMode.None);
        (document.visualizations[0] as any).settings.gridLinesMode = GridLinesMode.Both;

        const json: any = document.toJson();

        expect(json.Widgets[0].VisualizationSettings.GridLinesMode).toBe("Both");
    });
});
