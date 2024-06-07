import { linkFilterConverter } from "../../Core/Serialization/Converters/LinkFilterConverter";
import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { LinkType } from "../Enums";
import { DateLinkFilter } from "./DateLinkFilter";
import { LinkFilter } from "./LinkFilter";

export abstract class VisualizationLink {

    /**
     * The list of filters that will be applied to the target dashboard.
     */
    @JsonProperty("Parameters", { converter: linkFilterConverter})
    filters?: (LinkFilter | DateLinkFilter)[]; //todo: need conveter for DateLinkFilter and Link Filter

    /**
     * The title of the link.
     */
    @JsonProperty("Title")
    title?: string;

    /**
     * The type of the link.
     */
    @JsonProperty("Type")
    type: LinkType = LinkType.OpenDashboard
}