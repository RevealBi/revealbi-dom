import { DataSource, DataSourceItemFactory, Maps, NumberField, PieChartVisualization, RdashDocument, RestDataSourceItem, ScatterMapVisualization, TextField } from "@revealbi/dom";
import { DataSourceFactory } from "./DataSourceFactory";
import { DataSourceType } from "packages/dom/src/Data/Enums/DataSourceType";

export class RestDataSourceDashboards {
    static createDashboard() {
        const document = new RdashDocument("REST Dashboard");

        //json - default
        // const jsonDataSourceItem = new RestDataSourceItem("Sales by Category", "https://excel2json.io/api/share/6e0f06b3-72d3-4fec-7984-08da43f56bb9", new DataSource("JSON DS", "JSON DS Subtitle"));
        // jsonDataSourceItem.subtitle = "JSON Data Source Item";
        // jsonDataSourceItem.isAnonymous = true;
        // jsonDataSourceItem.fields = DataSourceFactory.getSalesByCategoryFields();

        const jsonDataSourceItem = DataSourceItemFactory.create(DataSourceType.REST, "rest-json", "Sales by Category", "JSON DS Subtitle", new DataSource("JSON DS", "JSON DS Subtitle"));
        jsonDataSourceItem.fields = DataSourceFactory.getSalesByCategoryFields();

        const jsonChart = new PieChartVisualization("JSON", jsonDataSourceItem).setLabel("CategoryName").setValue("ProductSales");

        //excel
        const excelDSI = new RestDataSourceItem("Marketing", "http://dl.infragistics.com/reportplus/reveal/samples/Samples.xlsx", new DataSource("Excel DS", "Excel DS Subtitle"));
        excelDSI.subtitle = "Excel Data Source Item";
        excelDSI.isAnonymous = true;
        excelDSI.fields = DataSourceFactory.getMarketingDataSourceFields();
        excelDSI.useExcel("Marketing");

        const excelChart = new PieChartVisualization("Excel", excelDSI).setLabel("Territory").setValue("Conversions")

        //csv
        const csvDSI = new RestDataSourceItem("Illinois School Info", "https://query.data.world/s/y32gtgblzpemyyvtig47dz7tedgkto", new DataSource("CSV DS", "CSV DS Subtitle"));
        csvDSI.subtitle = "CSV Data Source Item";
        csvDSI.isAnonymous = true;
        csvDSI.fields = DataSourceFactory.getCsvDataSourceFields();
        csvDSI.useCsv();

        const csvChart = new ScatterMapVisualization("Excel", csvDSI).setMap(Maps.NorthAmerica.UnitedStates.States.Illinois)
            .setLabel("School_Nm").setLongitude("X").setLatitude("Y")
            .configureSettings(settings => {
                settings.zoom.longitude = 1.38;
                settings.zoom.latitude = 41.65;
                settings.zoom.degreesLongitude = 1.04;
                settings.zoom.degreesLatitude = 0.39;
            });

        document.visualizations = [jsonChart, excelChart, csvChart];
        return document;
    }
}