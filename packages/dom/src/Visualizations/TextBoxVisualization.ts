import { DataSourceItem } from "../Data";
import { TextBoxDataDefinition } from "./DataDefinitions/TextBoxDataDefinition";
import { Alignment, ChartType, FontSize } from "./Enums";
import { TextBoxVisualizationSettings } from "./Settings/TextBoxVisualizationSettings";
import { Visualization } from "./Visualization";

export class TextBoxVisualization extends Visualization<TextBoxVisualizationSettings>  {
    constructor(title: string) {
        super(title, null);
        this.settings = new TextBoxVisualizationSettings();
        this.chartType = ChartType.TextBox;
        this.initializeDataDefinition(null);
    }

    get alignment(): Alignment {
        return this.textBoxDataDefinition.alignment;
    }

    set alignment(value: Alignment) {
        this.textBoxDataDefinition.alignment = value;
    }

    get fontSize(): FontSize {
        return this.textBoxDataDefinition.fontSize;
    }

    set fontSize(value: FontSize) {
        this.textBoxDataDefinition.fontSize = value;
    }

    get text(): string {
        return this.textBoxDataDefinition.text;
    }

    set text(value: string) {
        this.textBoxDataDefinition.text = value;
    }

    private get textBoxDataDefinition(): TextBoxDataDefinition {
        return this.dataDefinition as TextBoxDataDefinition;
    }

    override initializeDataDefinition(dataSourceItem: DataSourceItem | null): void {
        this.dataDefinition = new TextBoxDataDefinition();
        this.dataDefinition.bindings = undefined;
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