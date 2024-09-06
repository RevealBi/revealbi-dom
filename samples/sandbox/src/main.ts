// import './app/app.element';
import { RdashDocument } from "@revealbi/dom";
import { SqlServerDataSourceDashboard } from "./dashboards/SqlServerDataSourceDashboard";
import { RestDataSourceDashboards } from "./dashboards/RestDataSourceDashboards";
import { CustomDashboard } from "./dashboards/CustomDashboard";
import { SalesDashboard } from "./dashboards/SalesDashboard";

declare const $: any;

$.ig.RevealSdkSettings.setBaseUrl("https://samples.revealbi.io/upmedia-backend/reveal-api/");
//$.ig.RevealSdkSettings.setBaseUrl("http://localhost:5111/");

const loadDashboard = async () => {

    const viewer = document.getElementById('viewer');
    if (viewer) {

        //const dashboard = await $.ig.RVDashboard.loadDashboard("Sales");

        // const document = await RdashDocument.load("Sales");
        // const dashboard = await document.toRVDashboard();

        //const dashboard = await CustomDashboard.createDashboard().toRVDashboard();
        //const dashboard = await SqlServerDataSourceDashboard.createDashboard().toRVDashboard();
        //const dashboard = await RestDataSourceDashboards.createDashboard().toRVDashboard();
        const dashboard = await SalesDashboard.createDashboard().toRVDashboard();

        const revealView = new $.ig.RevealView(viewer);
        revealView.dashboard = dashboard;
    }

}

loadDashboard();


