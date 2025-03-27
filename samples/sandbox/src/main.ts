// import './app/app.element';
import { RdashDocument, VisualizationFilter } from "@revealbi/dom";
import { SqlServerDataSourceDashboard } from "./dashboards/SqlServerDataSourceDashboard";
import { RestDataSourceDashboards } from "./dashboards/RestDataSourceDashboards";
import { CustomDashboard } from "./dashboards/CustomDashboard";
import { SalesDashboard } from "./dashboards/SalesDashboard";
import { FixedLinesDashboard } from "./dashboards/features/FixedLines";

declare const $: any;

//$.ig.RevealSdkSettings.setBaseUrl("https://samples.revealbi.io/upmedia-backend/reveal-api/");
$.ig.RevealSdkSettings.setBaseUrl("http://localhost:5111/");

const loadDashboard = async () => {

    const viewer = document.getElementById('viewer');
    if (viewer) {

        //const dashboard = await $.ig.RVDashboard.loadDashboard("TEST");

        //const document = await RdashDocument.load("TEST");
        //console.log(document);
        //const dashboard = await document.toRVDashboard();

        // const document = await SalesDashboard.createDashboard()
        // const dashboard = await document.toRVDashboard();

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


        const document = await FixedLinesDashboard.createDashboard()
        const dashboard = await document.toRVDashboard();

        const revealView: any = new $.ig.RevealView(viewer); 
        revealView.onUrlLinkRequested = (args: any) => {
            console.log(args);
            return args.url ;
        };  
        revealView.dashboard = dashboard;



        //console.log(document);
    }

}

loadDashboard();


