import { RdashDocument } from "../../RdashDocument";
import { RdashSerializer } from "../Serialization/RdashSerializer";
import { getRevealSdkAdapter } from "./RevealSdkAdapter";

/**
 * Internal bridge between `RdashDocument` and the Reveal SDK. All SDK access goes
 * through the registered {@link RevealSdkAdapter}; this class never references the
 * SDK directly (no `import "reveal-sdk"`, no `$.ig`/`Reveal` global).
 */
export class RvDashboardLoader {

    /**
     * Resolves the input to an `RVDashboard` instance, loading via the registered
     * SDK adapter when given an id, or unzipping a Blob, as needed.
     */
    static async load(dashboard?: string | Blob | RdashDocument | unknown): Promise<any | null> {
        if (!dashboard) {
            return null;
        }

        if (typeof dashboard === "string") {
            return await getRevealSdkAdapter().loadDashboardById(dashboard);
        }

        if (dashboard instanceof Blob) {
            const json = await RdashSerializer.blobToJson(dashboard);
            return await this.loadRVDashboardFromJson(json);
        }

        if (dashboard instanceof RdashDocument) {
            return await dashboard.toRVDashboard();
        }

        // Assume it's already an `RVDashboard` instance. Duck-typed on purpose: a
        // `constructor.name === "RVDashboard"` check breaks under minification.
        return dashboard;
    }

    /** Builds an `RVDashboard` from rdash JSON text via the registered SDK adapter. */
    static async loadRVDashboardFromJson(json: string): Promise<unknown> {
        return await getRevealSdkAdapter().createDashboardFromJson(JSON.parse(json));
    }

    /** Serializes an `RVDashboard` back to rdash JSON via the registered SDK adapter. */
    static async dashboardToJson(rvDashboard: unknown): Promise<unknown> {
        return await getRevealSdkAdapter().dashboardToJson(rvDashboard);
    }
}
