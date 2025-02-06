import { AggregationType, AreaChartVisualization, BarChartVisualization, BubbleVisualization, BulletGraphVisualization, CandleStickVisualization, ChoroplethVisualization, CircularGaugeVisualization, ColumnChartVisualization, ComboChartType, ComboChartVisualization, CustomVisualization, DateAggregationType, DateDataField, DoughnutChartVisualization, FontSize, FunnelChartVisualization, GridVisualization, ImageVisualization, IndicatorDifferenceMode, KpiGoalPeriod, KpiTargetVisualization, KpiTimePeriod, KpiTimeVisualization, LabelDisplayMode, LineChartVisualization, LinearGaugeVisualization, MapColorMode, MapColorStyle, MapLabelStyle, Maps, NumberDataField, OHLCVisualization, PieChartVisualization, PivotVisualization, RadialVisualization, RdashDocument, RestDataSourceItem, ScatterMapVisualization, ScatterVisualization, ShapeType, SparklineAggregationType, SparklineVisualization, SplineAreaChartVisualization, SplineChartVisualization, StackedAreaChartVisualization, StackedBarChartVisualization, StackedColumnChartVisualization, StepAreaChartVisualization, StepLineChartVisualization, TextBoxVisualization, TextViewVisualization, TextVisualization, Theme, TimeSeriesVisualization, TreeMapVisualization, ValueComparisonType } from "@revealbi/dom";
import { DataSourceFactory } from "./DataSourceFactory";
import { DashboardCreator } from "./IDashboardCreator";


export class CustomDashboard implements DashboardCreator {
    name: string = "Custom Dashboard";
    
    createDashboard() : RdashDocument {

        const excelDataSourceItem = DataSourceFactory.getMarketingDataSourceItem();

        const csvDataSourceItem = new RestDataSourceItem("Illinois School Info", "https://query.data.world/s/y32gtgblzpemyyvtig47dz7tedgkto");
        csvDataSourceItem.isAnonymous = true;
        csvDataSourceItem.subtitle = "CSV Data Source Item";
        csvDataSourceItem.fields = DataSourceFactory.getCsvDataSourceFields();
        csvDataSourceItem.useCsv();

        const financialDataSourceItem = new RestDataSourceItem("OHLC", "https://excel2json.io/api/share/8bb2cd78-1b87-4142-00a2-08da188ec9ab");
        financialDataSourceItem.isAnonymous = true;
        financialDataSourceItem.subtitle = "Finance Data Source";
        financialDataSourceItem.fields = DataSourceFactory.getOHLCDataSourceFields();

        const revenueDataSourceItem = new RestDataSourceItem("Revenue", "https://excel2json.io/api/share/818e7b9a-f463-4565-435d-08da496bf5f2");
        revenueDataSourceItem.isAnonymous = true;
        revenueDataSourceItem.subtitle = "Choropleth Data Source";
        revenueDataSourceItem.fields = DataSourceFactory.getRevenueDataSourceFields();

        const document = new RdashDocument("Custom Dashboard");
        document.theme = Theme.Ocean;
        document.useAutoLayout = true;

        //grid
        const grid = new GridVisualization("Grid", excelDataSourceItem).setColumns("Territory", "Conversions", "Spend");

        //textview
        const textView = new TextViewVisualization("TextView", excelDataSourceItem).setColumns("Territory", "Conversions", "Spend");

        //pivot
        const pivot = new PivotVisualization("Pivot", excelDataSourceItem).setRow("Territory").setValue("New Seats").setColumn("CampaignID")
            .configureSettings(settings => {
                settings.showGrandTotals = true;
            });
        
        //column
        const column = new ColumnChartVisualization("Column", excelDataSourceItem).setLabel("Date").setValues("Paid Traffic", "Organic Traffic", "Other Traffic")

        //bar
        const bar = new BarChartVisualization("Bar", excelDataSourceItem).setLabel("Date").setValues("Paid Traffic", "Organic Traffic", "Other Traffic");

        //pie
        const pie = new PieChartVisualization("Pie", excelDataSourceItem).setLabel("Territory").setValue("Conversions")
        .configureSettings(settings => {
            settings.sliceLabelDisplay = LabelDisplayMode.Value
        });

        //doughnut
        const doughnut = new DoughnutChartVisualization("Doughnut", excelDataSourceItem).setLabel("Territory").setValue("Conversions")
            .configureSettings(settings => {
                settings.sliceLabelDisplay = LabelDisplayMode.ValueAndPercentage;
                settings.startPosition = 90;
            });

        //funnel
        const funnel = new FunnelChartVisualization("Funnel", excelDataSourceItem).setLabel("Territory").setValue("Conversions")
            .configureSettings(settings => {
                settings.sliceLabelDisplay = LabelDisplayMode.Percentage;
            });

        const dateMonthLabel = new DateDataField("Date");
        dateMonthLabel.aggregationType = DateAggregationType.Month;

        //combo
        const combo = new ComboChartVisualization("Combo", excelDataSourceItem).setLabel(dateMonthLabel).setChart1Value("Spend").setChart2Value("Budget")
        .configureSettings(settings =>
        {
            settings.chart1Type = ComboChartType.Column;
            settings.chart2Type = ComboChartType.Line;
            settings.showRightAxis = false;
            settings.startColorIndex = 5;
        });

        //stacked column
        const stackedColumn = new StackedColumnChartVisualization("Stacked Column", excelDataSourceItem).setLabel(dateMonthLabel).setValues("Paid Traffic", "Organic Traffic", "Other Traffic");

        //stacked bar
        const stackedBar = new StackedBarChartVisualization("Stacked Bar", excelDataSourceItem).setLabel(dateMonthLabel).setValues("Paid Traffic", "Organic Traffic", "Other Traffic");

        //stacked area
        const stackedArea = new StackedAreaChartVisualization("Stacked Area", excelDataSourceItem).setLabel(dateMonthLabel).setValues("Paid Traffic", "Organic Traffic", "Other Traffic");

        //area
        const area = new AreaChartVisualization("Area", excelDataSourceItem).setLabel(dateMonthLabel).setValues("Paid Traffic", "Organic Traffic", "Other Traffic");

        //line
        const line = new LineChartVisualization("Line", excelDataSourceItem).setLabel(dateMonthLabel).setValue("Conversions");

        //step area
        const stepArea = new StepAreaChartVisualization("Step Area", excelDataSourceItem).setLabel(dateMonthLabel).setValues("Spend", "Budget");

        //step line
        const stepLine = new StepLineChartVisualization("Step Line", excelDataSourceItem).setLabel(dateMonthLabel).setValues("Spend", "Budget");

        //spline area
        const splineArea = new SplineAreaChartVisualization("Spline Area", excelDataSourceItem).setLabel(dateMonthLabel).setValues("Spend", "Budget");

        //spline
        const spline = new SplineChartVisualization("Spline", excelDataSourceItem).setLabel(dateMonthLabel).setValues("Spend", "Budget");

        //linear gauge
        const linearGauge = new LinearGaugeVisualization("Linear", excelDataSourceItem).setLabel(dateMonthLabel).setValue("Spend")
            .configureSettings(settings => {
                settings.valueComparisonType = ValueComparisonType.Number;
                settings.upperBand.value = 10000;
                settings.middleBand.value = 5000;
            });

        //circular gauge
        const circularGauge = new CircularGaugeVisualization("Circular", excelDataSourceItem).setLabel("Budget").setValue("Spend")
            .configureSettings(settings => {
                settings.middleBand.value = 30;
            });

        //text
        const text = new TextVisualization("Text", excelDataSourceItem).setLabel("Budget").setValue("Spend")
            .configureSettings(settings => {
                settings.conditionalFormattingEnabled = true;
                settings.upperBand.shape = ShapeType.ArrowUp;
                settings.middleBand.shape = ShapeType.Dash;
                settings.lowerBand.shape = ShapeType.ArrowDown;
            });

        //kpi target
        const kpiTarget = new KpiTargetVisualization("KPI vs Target", excelDataSourceItem).setDate("Date").setValue("Spend").setTarget("Budget")
            .configureSettings(settings => {
                settings.differenceMode = IndicatorDifferenceMode.ValueAndPercentage;
                settings.goalPeriod = KpiGoalPeriod.ThisYear;
            });

        //kpi time
        const kpiTime = new KpiTimeVisualization("KPI vs Time", excelDataSourceItem).setDate("Date").setValue("Traffic")
            .configureSettings(settings => {
                settings.differenceMode = IndicatorDifferenceMode.ValueAndPercentage;
                settings.timePeriod = KpiTimePeriod.MonthToDatePreviousMonth;
            });

        //bullet graph
        const bulletGraph = new BulletGraphVisualization("Bullet Graph", excelDataSourceItem).setLabel("CampaignID").setValue("Spend").setTarget("Budget")
            .configureSettings(settings => {
                settings.valueComparisonType = ValueComparisonType.Number;
                settings.upperBand.value = 72000;
                settings.middleBand.value = 65000;
            });

        //choropleth map
        const choroplethMap = new ChoroplethVisualization("Choropleth", revenueDataSourceItem).setMap(Maps.NorthAmerica.UnitedStates.States.AllStates).setLocation("State").setValue("Revenue")
            .configureSettings(settings => {
                settings.colorIndex = 5;
                settings.colorStyle = MapColorStyle.SingleColor;
                settings.labelStyle = MapLabelStyle.Values;
            });

        const gradesField = new NumberDataField("Grades");
        gradesField.aggregationType = AggregationType.Avg;

        //scatter map
        const scatterMap = new ScatterMapVisualization("Scatter Map", csvDataSourceItem).setMap(Maps.NorthAmerica.UnitedStates.States.Illinois).setLongitude("X").setLatitude("Y").setLabel("School_Nm")
            .setColorByValue(gradesField)
            .configureSettings(settings =>
            {
                settings.colorIndex = 5;
                settings.colorMode = MapColorMode.ConditionalFormatting;
                
                settings.conditionalFormatting.valueComparisonType = ValueComparisonType.Percentage;
                settings.conditionalFormatting.upperBand.value = 90;
                settings.conditionalFormatting.middleBand.value = 60;

                settings.zoom.longitude = 1.38;
                settings.zoom.latitude = 41.65;
                settings.zoom.degreesLongitude = 1.04;
                settings.zoom.degreesLatitude = 0.39;
            });

        //tree map
        const treeMap = new TreeMapVisualization("Tree Map", excelDataSourceItem).setLabel("Territory").setValue("Traffic");

        //bubble
        const bubble = new BubbleVisualization("Bubble", excelDataSourceItem).setLabel("CampaignID").setXAxis("Budget").setYAxis("Spend").setRadius("Traffic");

        //scatter
        const scatter = new ScatterVisualization("Scatter", excelDataSourceItem).setLabel("CampaignID").setXAxis("Budget").setYAxis("Spend");

        //time series
        const timeSeries = new TimeSeriesVisualization("Time Series", excelDataSourceItem).setDate(dateMonthLabel).setValues("Paid Traffic", "Organic Traffic", "Other Traffic");

        //radial
        const radial = new RadialVisualization("Radial", excelDataSourceItem).setLabel(dateMonthLabel).setValues("Spend", "Budget");

        //image
        const image = new ImageVisualization("Image", excelDataSourceItem).setUrl("Territory");

        //sparkline
        const sparkline = new SparklineVisualization("Sparkline", excelDataSourceItem).setDate("Date").setValue("Spend").setCategory("Territory")
        .configureSettings(settings =>
        {
            settings.showLastTwoValues = false;
            settings.numberOfPeriods = 10;
            settings.aggregationType = SparklineAggregationType.Months;
        });

        //textbox
        const textbox = new TextBoxVisualization("TextBox").setText("This is some text").setFontSize(FontSize.Large);

        //custom
        const custom = new CustomVisualization("Custom", excelDataSourceItem).setUrl("https://dl.infragistics.com/reportplus/diy/HelloWorld-Desktop-EN.html").setRows("Territory", "CampaignID").setValues("Spend", "Budget");

        const dateDayLabel = new DateDataField("Date");
        dateDayLabel.aggregationType = DateAggregationType.Day;
        
        //OHLC
        const ohlc = new OHLCVisualization("OHLC", financialDataSourceItem).setLabel(dateDayLabel).setOpen("Open").setHigh("High").setLow("Low").setClose("Close");

        //candle stick
        const candleStick = new CandleStickVisualization("Candlestick", financialDataSourceItem).setLabel(dateDayLabel).setOpen("Open").setHigh("High").setLow("Low").setClose("Close");


        document.visualizations = [
            grid, textView, pivot, column, 
            bar, pie, doughnut, funnel, 
            combo, stackedColumn, stackedBar, stackedArea, 
            area, line, stepArea, stepLine, 
            splineArea, spline, linearGauge, circularGauge, 
            text, kpiTarget, kpiTime, bulletGraph,
            choroplethMap, scatterMap, treeMap, bubble,
            scatter, timeSeries, radial, image,
            sparkline, textbox, ohlc,
            candleStick, //custom
        ];

        //document.visualizations = [ candleStick ];

        return document;
    }
}