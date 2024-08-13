// import './app/app.element';

import { DashboardFactory } from "./dashboards/DashboardFactory";

declare const $: any;

$.ig.RevealSdkSettings.setBaseUrl("https://samples.revealbi.io/upmedia-backend/reveal-api/");

const loadDashboard = async () => {

    const viewer = document.getElementById('viewer');
    if (viewer) {

        //const dashboard = await $.ig.RVDashboard.loadDashboard("Sales");

        const dashboard = await DashboardFactory.createCustomDashboard().toRVDashboard();
        const revealView = new $.ig.RevealView(viewer);
        revealView.dashboard = dashboard;

    }

}

loadDashboard();


