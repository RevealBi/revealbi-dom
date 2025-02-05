// import './app/app.element';
import { RdashDocument } from "@revealbi/dom";
import { SqlServerDataSourceDashboard } from "./dashboards/SqlServerDataSourceDashboard";
import { RestDataSourceDashboards } from "./dashboards/RestDataSourceDashboards";
import { CustomDashboard } from "./dashboards/CustomDashboard";
import { MySqlDataSourceDashboards } from "./dashboards/MySQLDataSourceDashboard";
import { SalesDashboard } from "./dashboards/SalesDashboard";

declare const $: any;

$.ig.RevealSdkSettings.setBaseUrl("https://samples.revealbi.io/upmedia-backend/reveal-api/");
// $.ig.RevealSdkSettings.setBaseUrl("http://localhost:5111/");

const loadDashboard = async () => {
    // List all Dashboard Creators that implement DashboardCreator interface here
    const dashboardCreators = [
        new SalesDashboard(),
        new RestDataSourceDashboards(),
        new MySqlDataSourceDashboards()
    ]
    const viewer = document.getElementById('viewer');
    const header = document.getElementById('header');
    const revealView = new $.ig.RevealView(viewer);

    if (header) {
        header.innerHTML += "<input id='dashboard-name-input' type='text'></input> "
        header.innerHTML += "<button id='dashboard-creator-btn'>Create Dashboard</button>"

        const button = document.getElementById("dashboard-creator-btn") as HTMLButtonElement;
        const dashboardNameInput = document.getElementById("dashboard-name-input") as HTMLInputElement;

        button.addEventListener("click", async () => {
            const dashboardName = dashboardNameInput.value;
            const dashboardCreator = dashboardCreators.find(x => x.name === dashboardName);
            if (dashboardCreator) {
                const dashboard = await dashboardCreator.createDashboard().toRVDashboard();
                revealView.dashboard = dashboard;
            }
        });
    }

    if (viewer) {
        const dashboard = null;
        revealView.dashboard = dashboard;
    }
}

loadDashboard();


