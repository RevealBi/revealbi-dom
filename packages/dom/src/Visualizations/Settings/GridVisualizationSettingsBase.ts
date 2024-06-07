import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { Alignment } from "../Enums/Alignment";
import { FontSize } from "../Enums/FontSize";
import { GridVisualizationStyle } from "./Styles/GridVisualizationStyle";
import { VisualizationSettings } from "./VisualizationSettings";

export abstract class GridVisualizationSettingsBase extends VisualizationSettings {

    /**
     * Gets or sets the alignment of text in a date field.
     */
    public get DateFieldAlignment(): Alignment {
        return this.style.dateAlignment;
    }

    public set DateFieldAlignment(value: Alignment) {
        this.style.dateAlignment = value;
    }

    /**
     * Gets or set the size of the font.
     */
    @JsonProperty("FontSize")
    public fontSize: FontSize = FontSize.Small;

    /**
     * Gets or sets the alignment of text in a number field.
     */
    public get NumericFieldAlignment(): Alignment {
        return this.style.numericAlignment;
    }

    public set NumericFieldAlignment(value: Alignment) {
        this.style.numericAlignment = value;
    }

    /**
     * Gets or sets the alignment of text in a text field.
     */
    public get TextFieldAlignment(): Alignment {
        return this.style.textAlignment;
    }

    public set TextFieldAlignment(value: Alignment) {
        this.style.textAlignment = value;
    }

    @JsonProperty("Style")
    protected style: GridVisualizationStyle = new GridVisualizationStyle();
}