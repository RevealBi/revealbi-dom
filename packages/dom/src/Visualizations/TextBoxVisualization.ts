import { TextBoxDataDefinition } from "./DataDefinitions/TextBoxDataDefinition";
import { Alignment, ChartType, FontSize } from "./Enums";
import { TextBoxVisualizationSettings } from "./Settings/TextBoxVisualizationSettings";
import { Visualization } from "./Visualization";

export class TextBoxVisualization extends Visualization<TextBoxVisualizationSettings, TextBoxDataDefinition>  {

    constructor()
    constructor(title: string)
    constructor(title?: string) {
        super(title);

        this.dataDefinition = new TextBoxDataDefinition();
        this.dataDefinition.bindings = undefined;
        this.settings = new TextBoxVisualizationSettings();
        this.chartType = ChartType.TextBox;
    }

    get alignment(): Alignment {
        return this.dataDefinition.alignment;
    }

    set alignment(value: Alignment) {
        this.dataDefinition.alignment = value;
    }

    get fontSize(): FontSize {
        return this.dataDefinition.fontSize;
    }

    set fontSize(value: FontSize) {
        this.dataDefinition.fontSize = value;
    }

    get text(): string {
        return this.dataDefinition.text;
    }

    set text(value: string) {
        this.dataDefinition.text = value;
    }

    setAlignment(alignment: Alignment): this {
        this.alignment = alignment;
        return this;
    }

    setFontSize(fontSize: FontSize): this {
        this.fontSize = fontSize;
        return this;
    }

    setText(text: string): this {
        this.text = text;
        return this;
    }

    configureSettings(callback: (settings: TextBoxVisualizationSettings) => void): this {
        callback(this.settings);
        return this;
    }
}