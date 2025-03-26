import { DashboardCreator } from "./IDashboardCreator";
import { ColumnChartVisualization, RdashDocument } from "@revealbi/dom";
import { MySqlDataSource } from "@revealbi/dom";
import { MySqlDataSourceItem } from "@revealbi/dom";
import { DataSource, DataSourceItem, DateField, IField, NumberField, RestDataSourceItem, TextField } from "@revealbi/dom";

export class MySqlDataSourceDashboards implements DashboardCreator {
    name: string = "MySql Data Source Dashboard";

    createDashboard() {
        const document = new RdashDocument("MySQL Data Source Dashboard");

        // Data Source
        const mysqlDS = new MySqlDataSource("MySQL Dashboard", "MySql Dashboard Subtitle");
        mysqlDS.id = "mysqlDSID";
        mysqlDS.host = "revealdb01.infragistics.local";
        mysqlDS.database = "northwind";
        mysqlDS.port = "3306";

        const mysqlDSI = new MySqlDataSourceItem("MySQL Data Source Dashboard", mysqlDS);
        mysqlDSI.id = "mysqldsitemid";
        mysqlDSI.subtitle = "MySQL Datasource order table";
        mysqlDSI.database = "northwind";
        mysqlDSI.table = "employees";
        mysqlDSI.fields = [
            new NumberField("ReportsTo"),
            new NumberField("EmployeeID"),
            new TextField("Country"),
        ]

        const columnVS = new ColumnChartVisualization("Employees report", mysqlDSI)
            .setLabel("ReportsTo")
            .setValue("EmployeeID");

        document.visualizations = [columnVS];

        return document;
    }
}