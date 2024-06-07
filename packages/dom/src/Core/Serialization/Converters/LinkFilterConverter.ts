import { UrlLink, DashboardLink, DateLinkFilter, LinkFilter } from "../../../Visualizations/Primitives";

export function linkFilterConverter(json: any) {
    const filterType = json["Type"];
    switch (filterType) {
        case "Column":
        case "Literal":
            return LinkFilter;
        case "GlobalFilter":
            return DateLinkFilter;
        default:
            throw new Error(`LinkFilter not supported: ${filterType}`); 
    }
}