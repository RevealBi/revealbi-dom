import { DashboardCreator } from "./IDashboardCreator";
import { ColumnChartVisualization, DashboardDateFilter, RdashDocument } from "@revealbi/dom";
import { PostgreSqlDataSource, PostgreSqlDataSourceItem } from "@revealbi/dom";
import { DataSource, DataSourceItem, DateField, IField, NumberField, RestDataSourceItem, TextField } from "@revealbi/dom";

export class PostgreSqlDataSourceDashboards implements DashboardCreator {
    name: string = "Postgresql Data Source Dashboard";

    createDashboard() {
        const document = new RdashDocument("Postgresql Data Source Dashboard");

        // Data Source
        const postgresqlDS = new PostgreSqlDataSource("Postgresql Dashboard", "Postgresql Dashboard Subtitle");
        postgresqlDS.id = "postgresqlDSID";
        postgresqlDS.host = "revealdb01.infragistics.local";
        postgresqlDS.database = "northwind";
        postgresqlDS.port = "5432";
        postgresqlDS.defaultRefreshRate = 161;
        postgresqlDS.processDataOnServerReadOnly

        const dateFilter = new DashboardDateFilter();
        document.filters = [dateFilter];


        const postgresqlDSI = new PostgreSqlDataSourceItem("Employees", postgresqlDS);
        postgresqlDSI.id = "postgresdsiID";
        postgresqlDSI.subtitle = "Postgres DS Item for Employee";
        postgresqlDSI.database = "northwind";
        postgresqlDSI.table = "employees";

        postgresqlDSI.fields = [
            new NumberField("ReportsTo"),
            new NumberField("EmployeeID"),
            new TextField("Title"),
        ]

        const columnVS = new ColumnChartVisualization("Employees report", postgresqlDSI)
            .setLabel("ReportsTo")
            .setValue("EmployeeID")
            .connectDashboardFilters(dateFilter);


        document.visualizations = [columnVS];

        console.log(JSON.stringify(document));

        return document;
    }
}