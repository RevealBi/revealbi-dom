import { RdashDocument } from "@revealbi/dom";

export class RestDataSourceDashboards {
    static createDashboard() {
        const document = new RdashDocument("Sql Server Dashboard");

        return document;        
    }
}