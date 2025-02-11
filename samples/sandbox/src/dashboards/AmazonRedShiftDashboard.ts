import { DashboardCreator } from "./IDashboardCreator";
import { AmazonRedshiftDataSource, AmazonRedshiftDataSourceItem, ColumnChartVisualization, GridVisualization, RdashDocument } from "@revealbi/dom";
import { MySqlDataSource } from "@revealbi/dom";
import { MySqlDataSourceItem } from "@revealbi/dom";
import { DataSource, DataSourceItem, DateField, IField, NumberField, RestDataSourceItem, TextField } from "@revealbi/dom";

export class AmazonRedshiftDataSourceDashboards implements DashboardCreator {
    name: string = "Amazon Redshift Data Source Dashboard";

    createDashboard() {
        const document = new RdashDocument("Amazon Redshift Data Source Dashboard");

        // Data Source
        const amazonRedshiftDS = new AmazonRedshiftDataSource("Amazon Redshift Dashboard", "Amazon Redshift Dashboard Subtitle");
        amazonRedshiftDS.id = "azredshiftDSID";
        amazonRedshiftDS.host = "reveal-redshift.cmeyu4xjvffl.us-east-1.redshift.amazonaws.com";
        amazonRedshiftDS.database = "reveal";

        const amazonRedshiftDSI = new AmazonRedshiftDataSourceItem("Amazon Redshift Data Source Dashboard", amazonRedshiftDS);
        amazonRedshiftDSI.id = "azredshiftdsitemid";
        amazonRedshiftDSI.subtitle = "Amazon Redshift Datasource order table";
        amazonRedshiftDSI.table = "employees";
        amazonRedshiftDSI.fields = [
            new NumberField("employeeid"),
            new TextField("firstname"),
            new TextField("lastname"),
            new TextField("address"),
        ]

        const gridVS = new GridVisualization("List Employees", amazonRedshiftDSI)
            .setColumns("employeeid", "firstname", "lastname", "address");

        document.visualizations = [gridVS];

        return document;
    }
}