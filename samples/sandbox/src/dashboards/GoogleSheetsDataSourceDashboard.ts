import { DashboardCreator } from "./IDashboardCreator";
import { GoogleBigQueryDataSource, GoogleBigQueryDataSourceItem, GoogleSheetsDataSource, GoogleSheetsDataSourceItem, GridVisualization, PieChartVisualization, RdashDocument, SnowflakeDataSource, SnowflakeDataSourceItem } from "@revealbi/dom";
import { NumberField, TextField } from "@revealbi/dom";

export class GoogleSheetsDataSourceDashboard implements DashboardCreator {
  name: string = "GoogleSheets Data Source Dashboard";

  createDashboard() {
    const document = new RdashDocument("GoogleSheets Data Source Dashboard");

    const dsi = new GoogleSheetsDataSourceItem("GoogleSheets DSI", "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms");
    dsi.sheet = "Class Data";
    dsi.fields = [
      new TextField("Student Name"),
      new TextField("Gender"),
      new TextField("Class Level"),
      new TextField("Home State"),
      new TextField("Major"),
      new TextField("Extracurricular Activity")
    ];

    const visualiztion = new GridVisualization("Class list", dsi);
    visualiztion.setColumns("Student Name", "Gender", "Major", "Extracurricular Activity");

    document.visualizations.push(visualiztion);

    const jsonStr = document.toJsonString();

    console.log(jsonStr);

    return document;
  }
}