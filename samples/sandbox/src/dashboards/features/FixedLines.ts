import { AggregationType, ColumnChartVisualization, DataSource, FixedLineAverage, FixedLineData, FixedLineFixedValue, FixedLineMaximum, FixedLineMinimum, LineStyle, NumberDataField, RdashDocument, RestDataSourceItem } from "@revealbi/dom";
import { DataSourceFactory } from "../DataSourceFactory";

export class FixedLinesDashboard {

    static createDashboard(): RdashDocument {

        const excelDSI = new RestDataSourceItem("Marketing", "http://dl.infragistics.com/reportplus/reveal/samples/Samples.xlsx", new DataSource("Excel DS", "Excel DS Subtitle"));
        excelDSI.subtitle = "Excel Data Source Item";
        excelDSI.isAnonymous = true;
        excelDSI.fields = DataSourceFactory.getMarketingDataSourceFields();
        excelDSI.useExcel("Marketing");

        const document = new RdashDocument("Fixed Lines Dashboard");
        document.description = "This dashboard demonstrates how to add fixed lines.";

        const spendField = new NumberDataField("Spend");
        spendField.aggregationType = AggregationType.Avg;

        const fixedLine = new FixedLineData(spendField);
        fixedLine.lineStyle = LineStyle.Dashed;
        fixedLine.thickness = 4;
        fixedLine.color = "#F0629255";

        console.log(fixedLine.color);

        const chart = new ColumnChartVisualization("Column", excelDSI).setLabel("Date").setValues("Paid Traffic")
            .addFixedLine(new FixedLineAverage("My Title"))
            .addFixedLine(new FixedLineMaximum())
            .addFixedLine(fixedLine)
            .addFixedLine(new FixedLineMinimum())
            .addFixedLine(new FixedLineFixedValue(3000));

        document.visualizations = [chart];

        return document;
    }
}