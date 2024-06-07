import { visualizationLinkConverter } from "../../Core/Serialization/Converters/VisualizationLinkConverter";
import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { LinkTriggerType } from "../Enums/LinkTriggerType";
import { DashboardLink } from "./DashboardLink";
import { LinkFilter } from "./LinkFilter";
import { UrlLink } from "./UrlLink";

export class VisualizationLinker {

    /**
     * The type of trigger that will activate the link.
     */
    @JsonProperty("Trigger")
    trigger: LinkTriggerType = LinkTriggerType.SelectRow;
    
    /**
     * The list of actions that represent links.
     */
    @JsonProperty("Actions", { converter: visualizationLinkConverter })
    links: (DashboardLink | UrlLink)[] = [];

    /**
     * Adds a URL as a link.
     * @param title The title of the link
     * @param url The URL to open
     * @returns The current instance of the VisualizationLinker
     */
    addUrl(title: string, url: string): this {
        this.links.push(new UrlLink(title, url));
        return this;
    }

    /**
     * Adds a dashboard as a link.
     * @param title The title of the link
     * @param dashboard The dashboard id of the link
     * @param filters The list of filters that will be applied to the target dashboard
     * @returns The current instance of the VisualizationLinker
     */
    addDashboard(title: string, dashboard: string, filters: LinkFilter[]): this {
        this.links.push(new DashboardLink(title, dashboard, filters));
        return this;
    }
}