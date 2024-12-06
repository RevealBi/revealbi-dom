import { RdashDocument } from "../../RdashDocument";
import { RdashSerializer } from "../Serialization/RdashSerializer";

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
        this.ensureRevealSdkLoaded();
        if (typeof input === 'string') {
            return await $.ig.RVDashboard.loadDashboard(input);
        } else {
            const json = await RdashSerializer.blobToJson(input);
            return await this.loadFromJson(json);
        }
    }

    static async loadFromJson(json: string): Promise<unknown> {
        this.ensureRevealSdkLoaded();
        const parsedJson = JSON.parse(json);
        const dashboard = await $.ig.RevealUtility.createDashboardFromJsonObject(parsedJson);
        return dashboard;
    }

    private static ensureRevealSdkLoaded(): void {
        if (!(window as any).$?.ig?.RevealSdkSettings) {
            throw new Error("Reveal SDK is not loaded. Please make sure to include the Reveal SDK in your project.");
        }
    }
}

