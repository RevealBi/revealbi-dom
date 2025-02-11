import { DashboardCreator } from "./IDashboardCreator";
import { AmazonAthenaDataSource, AmazonAthenaDataSourceItem, GridVisualization, RdashDocument } from "@revealbi/dom";
import { TextField } from "@revealbi/dom";
import { RdashSerializer } from "packages/dom/src/Core/Serialization/RdashSerializer";

export class AmazonAthenaDataSourceDashboards implements DashboardCreator {
    name: string = "Amazon Athena Data Source Dashboard";

    createDashboard() {
        const document = new RdashDocument("Amazon Athena Data Source Dashboard");

        // Data Source
        const amazonAthenaDS = new AmazonAthenaDataSource("Amazon Athena Dashboard", "Amazon Athena Dashboard Subtitle");
        amazonAthenaDS.id = "amazonAthenaDSID";
        amazonAthenaDS.region = "us-east-1";
        amazonAthenaDS.database = "mydatabase";
        amazonAthenaDS.outputLocation = "s3://infragistics-test-bucket1/Temp";

        const amazonAthenaDSI = new AmazonAthenaDataSourceItem("Amazon Athena Data Source Dashboard", amazonAthenaDS);
        amazonAthenaDSI.id = "amazonathenadsitemid";
        amazonAthenaDSI.subtitle = "Amazon  Datasource order table";
        amazonAthenaDSI.table = "northwindinvoicesparquet";
        amazonAthenaDSI.fields = [
            new TextField("country"),
            new TextField("customerid"),
            new TextField("customername")
        ]

        const columnVS = new GridVisualization("Amazon Athena Grid", amazonAthenaDSI)
            .setColumns("customerid", "customername", "country");

        document.visualizations = [columnVS];

        console.log(RdashSerializer.serialize(document));

        return document;
    }
}