import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { LinkType } from "../Enums";
import { DateLinkFilter } from "./DateLinkFilter";
import { LinkFilter } from "./LinkFilter";
import { VisualizationLink } from "./VisualizationLink";

export class DashboardLink extends VisualizationLink {

    constructor()
    constructor(title: string, dashboard: string)
    constructor(title: string, dashboard: string, filters: (LinkFilter | DateLinkFilter)[])
    constructor(title?: string, dashboard?: string, filters?: (LinkFilter | DateLinkFilter)[]) {
        super();
        this.title = title;
        this.dashboard = dashboard;
        this.filters = filters;
        this.type = LinkType.OpenDashboard;
    }

    /**
     * The dashboard id of the link.
     */
    @JsonProperty("Url")
    dashboard?: string;
}