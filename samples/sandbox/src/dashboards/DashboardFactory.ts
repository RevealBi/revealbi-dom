import { CustomDashboard } from "./CustomDashboard";
import { DashboardLinkingDashboard } from "./DashboardLinkingDashboard";

export class DashboardFactory {
    static createCustomDashboard() {
        return CustomDashboard.createDasboard();
    }

    static createDashboardLinkingDashboard() {
        return DashboardLinkingDashboard.createDashboard();
    }
}