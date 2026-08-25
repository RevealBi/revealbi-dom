import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { LinkType, UrlLinkTarget } from "../Enums";
import { VisualizationLink } from "./VisualizationLink";

export class UrlLink extends VisualizationLink {

    constructor()
    constructor(title: string, url: string)
    constructor(title: string, url: string, target: UrlLinkTarget)
    constructor(title?: string, url?: string, target: UrlLinkTarget = UrlLinkTarget.NewTab) {
        super();
        this.title = title;
        this.url = url;
        this.target = target;
        this.type = LinkType.OpenUrl;
    }

    /**
     * The URL of the link.
     */
    @JsonProperty("Url")
    url?: string;

    /**
     * Where the URL will be opened.
     */
    @JsonProperty("Target")
    target: UrlLinkTarget = UrlLinkTarget.NewTab;
}