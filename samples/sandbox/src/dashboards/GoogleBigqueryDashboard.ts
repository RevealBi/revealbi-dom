import { DashboardCreator } from "./IDashboardCreator";
import { GoogleBigQueryDataSource, GoogleBigQueryDataSourceItem, GridVisualization, PieChartVisualization, RdashDocument, SnowflakeDataSource, SnowflakeDataSourceItem } from "@revealbi/dom";
import { NumberField, TextField } from "@revealbi/dom";

export class GoogleBigQueryDataSourceDashboard implements DashboardCreator {
  name: string = "Google BigQuery Data Source Dashboard";

  createDashboard() {
    const document = new RdashDocument("Google BigQuery Data Source Dashboard");

    const ds = new GoogleBigQueryDataSource("Google BigQuery", "Google BigQuery DataSource");
    ds.projectId = "bigquery-public-data"


    const dsi = new GoogleBigQueryDataSourceItem("Google BigQuery DSI", ds);
    dsi.dataSetId = "america_health_rankings";
    dsi.projectId = "bigquery-public-data"
    dsi.table = "ahr"
    dsi.fields = [
      new NumberField("edition"),
      new TextField("state_name"),
    ];

    const visualiztion = new GridVisualization("List edition states", dsi);
    visualiztion.setColumns("edition", "state_name")

    document.visualizations.push(visualiztion);

    const jsonStr = document.toJsonString();

    console.log(jsonStr);

    return document;
  }
}