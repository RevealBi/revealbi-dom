import { DataSourceItemFactory, GridVisualization, MicrosoftSqlServerDataSource, MicrosoftSqlServerDataSourceItem, NumberField, RdashDocument, TextField } from "@revealbi/dom";
import { DataSourceType } from "packages/dom/src/Data/Enums/DataSourceType";

export class SqlServerDataSourceDashboard {
    static createDashboard() {

        const document = new RdashDocument("Sql Server Dashboard");

        const ds = new MicrosoftSqlServerDataSource();
        ds.title = "Northwind";
        ds.subtitle = "Northwind Subtitle";

        const customers = new MicrosoftSqlServerDataSourceItem("Customers", "Customers", ds);
        //const customers = DataSourceItemFactory.create(DataSourceType.MicrosoftSqlServer, "table-customers", "Customers Title", "Customers Subtitle");
        customers.fields = [
            new TextField("CustomerID"),
            new TextField("ContactName"),
            new TextField("ContactTitle"),
            new TextField("City")
        ];

        const employees = new MicrosoftSqlServerDataSourceItem("Employees", "Employees", ds);
        //const employees = DataSourceItemFactory.create(DataSourceType.MicrosoftSqlServer, "table-employees", "Employees Title", "Employees Subtitle");
        employees.fields = [
            new NumberField("EmployeeID"),
            new TextField("FirstName"),
            new TextField("LastName"),
        ];

        const grid1 = new GridVisualization("Customer List", customers).setColumns("ContactName", "ContactTitle", "City");
        const grid2 = new GridVisualization("Employee List", employees).setColumns("FirstName", "LastName");
        
        document.visualizations = [grid1, grid2];

        return document;
    }
}