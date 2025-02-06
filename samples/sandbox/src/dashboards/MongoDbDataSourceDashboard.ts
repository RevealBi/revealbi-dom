import { DashboardCreator } from "./IDashboardCreator";
import { ColumnChartVisualization, GridVisualization, MongoDbDataSource, MongoDbDataSourceItem, RdashDocument } from "@revealbi/dom";
import { MySqlDataSource } from "@revealbi/dom";
import { MySqlDataSourceItem } from "@revealbi/dom";
import { NumberField, TextField } from "@revealbi/dom";

export class MongoDbDataSourceDashboard implements DashboardCreator {
    name: string = "MongoDb Data Source Dashboard";

    createDashboard() {
        const document = new RdashDocument("MongoDb Data Source Dashboard");

        // Data Source
        /**
         * Note: You need to provide credentials in backend.
         */
        const ds = new MongoDbDataSource("MongoDB", "MongoDB Subtitle");
        ds.connectionString = "mongodb+srv://cluster0.ta2xrrt.mongodb.net/";
        ds.database = "test";
        ds.processDataOnServerDefaultValue = true;
        ds.processDataOnServerReadOnly = false;

        const dsi = new MongoDbDataSourceItem("MongoDB Ds Item", ds);
        dsi.id = "mongoDSID";
        dsi.collection = "data";
        dsi.fields = [
            new TextField("_id"),
            new TextField("name"),
            new NumberField("price"),
            new TextField("category"),
            new NumberField("year_value"),
            new NumberField("month_value"),
            new NumberField("day_value"),
            new NumberField("hour_value"),
            new NumberField("minutes_value"),
            new NumberField("seconds_value"),
            new NumberField("milliseconds_value"),
            new NumberField("numeric_value1"),
            new NumberField("numeric_value2"),
            new NumberField("numeric_value3"),
            new TextField("image_url")
        ];

        const visualiztion = new GridVisualization("Test MongoDB Datasource", dsi);
        visualiztion.setColumns("name", "category", "price");

        document.visualizations.push(visualiztion);

        return document;
    }
}