// import './app/app.element';
import { RdashDocument } from "@revealbi/dom";
import { SqlServerDataSourceDashboard } from "./dashboards/SqlServerDataSourceDashboard";
import { RestDataSourceDashboards } from "./dashboards/RestDataSourceDashboards";
import { CustomDashboard } from "./dashboards/CustomDashboard";
import { MySqlDataSourceDashboards } from "./dashboards/MySQLDataSourceDashboard";
import { SalesDashboard } from "./dashboards/SalesDashboard";
import { GoogleBigQueryDataSourceDashboard } from "./dashboards/GoogleBigqueryDashboard";

declare const $: any;

// $.ig.RevealSdkSettings.setBaseUrl("https://samples.revealbi.io/upmedia-backend/reveal-api/");
$.ig.RevealSdkSettings.setBaseUrl("http://localhost:5111/");

const loadDashboard = async () => {
    // List all Dashboard Creators that implement DashboardCreator interface here
    const dashboardCreators = [
        new SalesDashboard(),
        new RestDataSourceDashboards(),
        new MySqlDataSourceDashboards(),
        new GoogleBigQueryDataSourceDashboard(),
    ]
    const viewer = document.getElementById('viewer');
    const header = document.getElementById('header');
    const revealView = new $.ig.RevealView(viewer);

    if (header) {

        // Add a dropdown to select the dashboard
        header.innerHTML += "<select id='dashboard-name-input'></select> "
        header.innerHTML += "<button id='dashboard-creator-btn'>Create Dashboard</button>"

        const select = document.getElementById("dashboard-name-input") as HTMLSelectElement;
        dashboardCreators.forEach(dashboardCreator => {
            const option = document.createElement("option");
            option.value = dashboardCreator.name;
            option.text = dashboardCreator.name;
            select.appendChild(option);
        });

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


