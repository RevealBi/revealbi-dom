import { visualizationLinkConverter } from "../../../Core/Serialization/Converters/VisualizationLinkConverter";
import { JsonProperty } from "../../../Core/Serialization/Decorators/JsonProperty";
import { VisualizationLink } from "../../Primitives/VisualizationLink";

/**
 * Configures a hyperlink displayed by a grid column.
 */
export class GridColumnHyperlink {
    constructor()
    constructor(link: VisualizationLink, displayTextTemplate?: string)
    constructor(link?: VisualizationLink, displayTextTemplate?: string) {
        this.link = link;
        this.displayTextTemplate = displayTextTemplate;
    }

    /**
     * Gets or sets the link followed when a cell in the column is selected.
     */
    @JsonProperty("Action", { converter: visualizationLinkConverter })
    link?: VisualizationLink;

    /**
     * Gets or sets the template used to render the hyperlink text.
     * When omitted, the formatted cell value is displayed.
     */
    @JsonProperty("DisplayTextTemplate")
    displayTextTemplate?: string;
}
