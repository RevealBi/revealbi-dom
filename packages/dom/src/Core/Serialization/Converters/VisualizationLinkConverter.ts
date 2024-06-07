import { UrlLink, DashboardLink } from "../../../Visualizations/Primitives";

export function visualizationLinkConverter(json: any) {
    const linkType = json["Type"];
    switch (linkType) {
        case "OpenUrl":
            return UrlLink;
        case "OpenDashboard":
            return DashboardLink;
        default:
            throw new Error(`Band not supported: ${linkType}`); 
    }
}