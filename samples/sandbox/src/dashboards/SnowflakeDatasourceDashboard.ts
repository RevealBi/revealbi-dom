import { DashboardCreator } from "./IDashboardCreator";
import { PieChartVisualization, RdashDocument, SnowflakeDataSource, SnowflakeDataSourceItem } from "@revealbi/dom";
import { NumberField, TextField } from "@revealbi/dom";

export class SnowflakeDataSourceDashboard implements DashboardCreator {
  name: string = "Snowflake Data Source Dashboard";

  createDashboard() {
    const document = new RdashDocument("Snowflake Data Source Dashboard");

    const ds = new SnowflakeDataSource("Snowflake", "Snowflake DataSource");
    ds.account = "pqwkobs-xb90908"
    ds.defaultRefreshRate = 120
    ds.host = "gpiskyj-al16914.snowflakecomputing.com"
    ds.database = "SNOWFLAKE_SAMPLE_DATA"
    ds.warehouse = "COMPUTE_WH"
    ds.schema = "TPCH_SF10"


    const dsi = new SnowflakeDataSourceItem("Snowflake DSI", ds);
    dsi.schema = "TPCH_SF10";
    dsi.table = "ORDERS";
    dsi.database = "SNOWFLAKE_SAMPLE_DATA";
    dsi.fields = [
      new NumberField("O_ORDERKEY"),
      new NumberField("O_CUSTKEY"),
      new TextField("O_ORDERPRIORITY"),
    ];

    const visualiztion = new PieChartVisualization("Snowflake Order Priorities", dsi);
    visualiztion.setLabel("O_ORDERPRIORITY");
    visualiztion.setValues("O_CUSTKEY");

    document.visualizations.push(visualiztion);

    return document;
  }
}