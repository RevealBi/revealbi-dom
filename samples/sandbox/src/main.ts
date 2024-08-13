// import './app/app.element';
import { RdashDocument } from "@revealbi/dom";
import { DashboardFactory } from "./dashboards/DashboardFactory";

declare const $: any;

$.ig.RevealSdkSettings.setBaseUrl("https://samples.revealbi.io/upmedia-backend/reveal-api/");
//$.ig.RevealSdkSettings.setBaseUrl("http://localhost:5111/");

const loadDashboard = async () => {

    const viewer = document.getElementById('viewer');
    if (viewer) {

        //const dashboard = await $.ig.RVDashboard.loadDashboard("Sales");

        //const dashboard = await DashboardFactory.createCustomDashboard().toRVDashboard();

        const document = await RdashDocument.load("Sales");
        const dashboard = await document.toRVDashboard();

        const revealView = new $.ig.RevealView(viewer);
        revealView.dashboard = dashboard;
    }

}

loadDashboard();


