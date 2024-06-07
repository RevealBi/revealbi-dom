import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { LinkFilterType } from "../Enums";

export class LinkFilter {
    constructor()
    constructor(name: string, targetFilterId: string, value: string);
    constructor(name: string, targetFilterId: string, value: string, linkFilterType: LinkFilterType);
    constructor(name?: string, targetFilterId?: string, value?: string, linkFilterType: LinkFilterType = LinkFilterType.Column) {
        this.name = name;
        this.targetFilterId = targetFilterId;
        this.value = value;
        this.type = linkFilterType;
    }

    /**
     * The name of the filter.
     */
    @JsonProperty("Name")
    name?: string;

    /**
     * The filter ID of the target dashboard that will be used to map the value to the target dashboard's filter.
     */
    @JsonProperty("Namespace")
    targetFilterId?: string;

    /**
     * The type of the filter.
     */
    @JsonProperty("Type")
    type: LinkFilterType = LinkFilterType.Column;

    /**
     * The value of the filter.
     */
    @JsonProperty("Value")
    value?: string;
}