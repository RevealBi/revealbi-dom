import { AggregationType, BarChartVisualization, Bound, BulletGraphVisualization, ColumnChartVisualization, DashboardDataFilter, DashboardDateFilter, DateAggregationType, DateDataField, FilterType, KpiTargetVisualization, KpiTimeVisualization, NegativeFormatType, NumberDataField, NumberFilter, NumberFormatting, NumberFormattingType, NumberRuleType, RdashDocument, SortingType, SparklineVisualization, SplineAreaChartVisualization, StackedColumnChartVisualization, ValueComparisonType } from "@revealbi/dom";
import { DataSourceFactory } from "./DataSourceFactory";
import { DashboardCreator } from "./IDashboardCreator";

export class SalesDashboard implements DashboardCreator {
    name: string = "Sales Dashboard";

    createDashboard(): RdashDocument {

        const excelDataSourceItem = DataSourceFactory.getSalesDataSourceItem();

        const document = new RdashDocument("Sales");
        document.useAutoLayout = false;

        const dateFilter = new DashboardDateFilter();
        const territoryFilter = new DashboardDataFilter("Territory", excelDataSourceItem);
        document.filters = [dateFilter, territoryFilter];

        const pipelineField = new NumberDataField("Pipepline");
        pipelineField.fieldLabel = "Actual Sales";
        pipelineField.aggregationType = AggregationType.Sum;
        pipelineField.sorting = SortingType.Asc;
        pipelineField.formatting = new NumberFormatting();
        pipelineField.formatting.formatType = NumberFormattingType.Currency;
        pipelineField.formatting.currencySymbol = "$";
        pipelineField.formatting.decimalDigits = 0;
        pipelineField.formatting.showGroupingSeparator = true;
        pipelineField.formatting.negativeFormat = NegativeFormatType.MinusSign;
        pipelineField.formatting.applyMkFormat = true;

        const kpiTarget = new KpiTargetVisualization("Sales", excelDataSourceItem).setDate("Date").setValue(pipelineField).setTarget("Forecasted")
            .connectDashboardFilter(territoryFilter)
            .setPosition(20, 11);

        const dateFieldByMonth = new DateDataField("Date");
        dateFieldByMonth.aggregationType = DateAggregationType.Month;

        const splineArea = new SplineAreaChartVisualization("New vs Renewal Sales", excelDataSourceItem).setLabel(dateFieldByMonth).setValues("New Sales", "Renewal Sales ")
            .connectDashboardFilters(dateFilter, territoryFilter)
            .setPosition(39, 31);

        const stackedColumn = new StackedColumnChartVisualization("Sales by Product", excelDataSourceItem).setLabel("Product").setValues("New Sales", "Renewal Sales ")
            .connectDashboardFilters(dateFilter, territoryFilter)
            .setPosition(39, 18);

        const dateFieldByYear = new DateDataField("Date");
        dateFieldByYear.aggregationType = DateAggregationType.Year;

        const kpiTime = new KpiTimeVisualization("Total Opportunities", excelDataSourceItem).setDate(dateFieldByYear).setValue("Total Opportunites")
            .connectDashboardFilter(territoryFilter)
            .setPosition(19, 11);

        const sparkline = new SparklineVisualization("New Seats by Product", excelDataSourceItem).setDate(dateFieldByMonth).setValue("New Seats").setCategory("Product")
            .connectDashboardFilters(dateFilter, territoryFilter)
            .setPosition(30, 31);

        const bar = new BarChartVisualization("Sales", excelDataSourceItem).setLabel("Employee").setValues(pipelineField)
            .connectDashboardFilters(dateFilter, territoryFilter)
            .setPosition(43, 29);

        const column = new ColumnChartVisualization("Leads", excelDataSourceItem).setLabel(dateFieldByMonth).setValues("Leads", "Hot Leads")
            .connectDashboardFilters(dateFilter, territoryFilter)
            .setPosition(46, 31);

        const quotaField = new NumberDataField("Quota");
        quotaField.formatting = new NumberFormatting();
        quotaField.formatting.formatType = NumberFormattingType.Percent;
        quotaField.formatting.decimalDigits = 2;
        quotaField.formatting.showGroupingSeparator = false;
        quotaField.formatting.applyMkFormat = true;

        const numberFilter = new NumberFilter();
        numberFilter.filterType = FilterType.FilterByRule;
        numberFilter.ruleType = NumberRuleType.TopItems;
        numberFilter.value = 10;

        const bulletGraph = new BulletGraphVisualization("Quotas by Sales Rep", excelDataSourceItem).setLabel("Employee").setValue(quotaField)
            .configureSettings(settings => {
                settings.minimum = new Bound();
                settings.minimum.value = 0.8;

                settings.maximum = new Bound();
                settings.maximum.value = 2.0;

                settings.valueComparisonType = ValueComparisonType.Number;
                settings.upperBand.value = 100.0;
                settings.middleBand.value = 80.0;
            })
            .addDataFilter("Quota", numberFilter)
            .connectDashboardFilters(dateFilter, territoryFilter)
            .setPosition(33, 29);

        document.visualizations = [kpiTarget, splineArea, stackedColumn, kpiTime, sparkline, bar, column, bulletGraph];

        return document;
    }

}