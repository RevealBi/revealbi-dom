// import './app/app.element';
import * as RevealSdk from "reveal-sdk";
import { RevealSdkSettings, RevealView, RVDashboard, RevealUtility } from "reveal-sdk";
import { DashboardDateFilter, GridVisualization, RdashDocument, VisualizationFilter, registerRevealSdk } from "@revealbi/dom";
import { SqlServerDataSourceDashboard } from "./dashboards/SqlServerDataSourceDashboard";
import { RestDataSourceDashboards } from "./dashboards/RestDataSourceDashboards";
import { CustomDashboard } from "./dashboards/CustomDashboard";
import { SalesDashboard } from "./dashboards/SalesDashboard";
import { FixedLinesDashboard } from "./dashboards/features/FixedLines";

//RevealSdkSettings.setBaseUrl("https://samples.revealbi.io/upmedia-backend/reveal-api/");
RevealSdkSettings.setBaseUrl("https://localhost:7064/");

// Opt-in adapter: register the SDK once so @revealbi/dom's load()/toRVDashboard()
// bridge to reveal-sdk without the DOM ever importing it directly.
registerRevealSdk(RevealSdk);

const loadDashboard = async () => {

    const viewer = document.getElementById('viewer');
    if (viewer) {

        // const rvdashboard = await RVDashboard.loadDashboard("Sales"); //loads from server
        // const document = await RdashDocument.load(rvdashboard);
        // const dashboard = RevealUtility.createDashboardFromJsonObject(document.toJson());

        const document = await RdashDocument.load("Banking");
        document.useAutoLayout = true;
        const grid = GridVisualization.from(document.visualizations[1], { includeAllFields: true });
        if (grid) {
            var dateFilter = document.filters.find(f => f.id === "_date") as DashboardDateFilter;
            grid!.connectDashboardFilter(dateFilter, "date");
            document.visualizations = [grid!];
        }

        const dashboard = await document.toRVDashboard();

        //  const document = await SalesDashboard.createDashboard()
        //  const dashboard = await document.toRVDashboard();

        //const dashboard = await CustomDashboard.createDashboard().toRVDashboard();
        //const dashboard = await SqlServerDataSourceDashboard.createDashboard().toRVDashboard();
        //const dashboard = await RestDataSourceDashboards.createDashboard().toRVDashboard();
        //const dashboard = await SalesDashboard.createDashboard().toRVDashboard();

        //const document = await RdashDocument.load("TEST");


        //const newDocument = new RdashDocument("TEST");
        //newDocument.import(document, undefined, { includeDashboardFilters: true });
        // newDocument.import(document, document.visualizations[0]);
        // newDocument.import(document, document.visualizations[0], { includeDashboardFilters: true });        
        // newDocument.import(document, document.visualizations[2]);
        // newDocument.import(document, document.visualizations[2], { includeDashboardFilters: true });        

        // const viz = document.visualizations[1];
        // viz.filters = [new VisualizationFilter("name"), new VisualizationFilter("status")];
        // newDocument.import(document, viz, { includeVisualizationFilters: true });

        //const dashboard = await newDocument.toRVDashboard();
        //console.log(newDocument);


        // const document = await FixedLinesDashboard.createDashboard()
        //const dashboard = await document.toRVDashboard();

        const revealView: any = new RevealView(viewer);
        // revealView.onUrlLinkRequested = (args: any) => {
        //     console.log(args);
        //     return args.url;
        // };
        revealView.dashboard = dashboard;
    }

}

loadDashboard();


