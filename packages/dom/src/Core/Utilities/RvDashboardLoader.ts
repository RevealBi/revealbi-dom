import { RdashDocument } from "../../RdashDocument";
import { RdashSerializer } from "../Serialization/RdashSerializer";
import { isBrowserEnvironment } from "./Environment";

declare let $: any;

export class RvDashboardLoader {

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
        this.ensureRevealSdkLoaded();
        if (typeof input === 'string') {
            return await $.ig.RVDashboard.loadDashboard(input);
        } else {
            const json = await RdashSerializer.blobToJson(input);
            return await this.loadRVDashboardFromJson(json);
        }
    }

    static async loadRVDashboardFromJson(json: string): Promise<unknown> {
        this.ensureRevealSdkLoaded();
        const parsedJson = JSON.parse(json);
        const dashboard = await $.ig.RevealUtility.createDashboardFromJsonObject(parsedJson);
        return dashboard;
    }

    private static ensureRevealSdkLoaded(): void {
        if (!isBrowserEnvironment) {
            throw new Error("This function must be run in a browser environment.");
        }
    
        if (!(window as any).$?.ig?.RevealSdkSettings) {
            throw new Error("Reveal SDK is not loaded. Please make sure to include the Reveal SDK in your project.");
        }
    }
}

