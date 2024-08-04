import { RdashDocument } from "../../RdashDocument";

declare let $: any;

export class DashboardLoader {

    static async load(dashboard?: string | Blob | RdashDocument | unknown): Promise<any | null> {

        if (!dashboard) {
            return null;
        }

        if (typeof dashboard === "string" || dashboard instanceof Blob) {
            return await this.loadRVDashboard(dashboard);
        }

        if (dashboard instanceof RdashDocument) {
            return await dashboard.toRVDashboard();
        }

        if (dashboard.constructor.name === "RVDashboard") {
            return dashboard;
        }

        throw new Error("Invalid Dashboard provided to DashboardLoader.load");
    }

    private static async loadRVDashboard(input: string | Blob): Promise<unknown> {
        const revealSdkSettings = (window as any).$?.ig?.RevealSdkSettings;
        if (revealSdkSettings) {
            if (typeof input === 'string') {
                return await $.ig.RVDashboard.loadDashboard(input);
            } else {
                return await $.ig.RVDashboard.loadDashboardFromContainer(input);
            }
        }
        else {
            throw new Error("Reveal SDK is not loaded. Please make sure to include the Reveal SDK in your project.");
        }
    }
}

