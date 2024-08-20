import { DataSource, Maps, NumberField, PieChartVisualization, RdashDocument, RestDataSourceItem, ScatterMapVisualization, TextField } from "@revealbi/dom";

export class RestDataSourceDashboards {
    static createDashboard() {
        const document = new RdashDocument("REST Dashboard");

        //json - default
        const dataSource = new DataSource();
        dataSource.title = "JSON DS";
        dataSource.subtitle = "JSON DS Subtitle";

        const jsonDataSourceItem = new RestDataSourceItem("Sales by Category", dataSource);
        jsonDataSourceItem.subtitle = "JSON Data Source Item";
        jsonDataSourceItem.uri = "https://excel2json.io/api/share/6e0f06b3-72d3-4fec-7984-08da43f56bb9";
        jsonDataSourceItem.isAnonymous = true;
        jsonDataSourceItem.fields = [
            new NumberField("CategoryID"),
            new TextField("CategoryName"),
            new TextField("ProductName"),
            new NumberField("ProductSales"),
        ]

        const jsonChart = new PieChartVisualization("JSON", jsonDataSourceItem).setLabel("CategoryName").setValue("ProductSales");

        //excel
        const excelDS = new DataSource();
        excelDS.title = "Excel DS";
        excelDS.subtitle = "Excel DS Subtitle";

        const excelDSI = new RestDataSourceItem("Marketing", excelDS);
        excelDSI.subtitle = "Excel Data Source Item";
        excelDSI.uri = "http://dl.infragistics.com/reportplus/reveal/samples/Samples.xlsx";
        excelDSI.isAnonymous = true;
        excelDSI.fields = [
            new TextField("CampaignID"),
            new TextField("Territory"),
            new NumberField("Conversions"),
        ]
        excelDSI.useExcel("Marketing");

        const excelChart = new PieChartVisualization("Excel", excelDSI).setLabel("Territory").setValue("Conversions")

        //csv
        const csvDS = new DataSource();
        csvDS.title = "CSV DS";
        csvDS.subtitle = "CSV DS Subtitle";

        const csvDSI = new RestDataSourceItem("Illinois School Info", csvDS);
        csvDSI.subtitle = "CSV Data Source Item";
        csvDSI.uri = "https://query.data.world/s/y32gtgblzpemyyvtig47dz7tedgkto";
        csvDSI.isAnonymous = true;
        csvDSI.fields = [
            new TextField("School_ID"),
            new TextField("School_Nm"),
            new NumberField("X"),
            new NumberField("Y"),
        ]
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