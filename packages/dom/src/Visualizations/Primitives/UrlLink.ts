import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { LinkType } from "../Enums";
import { VisualizationLink } from "./VisualizationLink";

export class UrlLink extends VisualizationLink {

    constructor()
    constructor(title: string, url: string)
    constructor(title?: string, url?: string) {
        super();
        this.title = title;
        this.url = url;
        this.type = LinkType.OpenUrl;
    }

    /**
     * The URL of the link.
     */
    @JsonProperty("Url")
    url?: string;
}