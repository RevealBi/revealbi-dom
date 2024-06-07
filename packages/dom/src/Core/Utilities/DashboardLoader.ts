/* eslint-disable @typescript-eslint/no-explicit-any */
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
        if (typeof input === 'string') {
           return await $.ig.RVDashboard.loadDashboard(input);
        } else {
            //todo: improve this so we are not hitting the server to create an RVDocument from json
            //this might require work in the SDK
            return await $.ig.RVDashboard.loadDashboardFromContainer(input);
        }
    }

}

