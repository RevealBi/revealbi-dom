import { SchemaTypeNames } from "../../Core/Constants/SchemaTypeNames";
import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { Alignment } from "../Enums/Alignment";
import { FontSize } from "../Enums/FontSize";
import { DataDefinitionBase } from "./DataDefinitionBase";

export class TextBoxDataDefinition extends DataDefinitionBase {
    constructor() {
        super();
        this.schemaTypeName = SchemaTypeNames.TextBoxDataSpecType;
    }

    @JsonProperty("Text")
    text!: string;

    @JsonProperty("FontSize")
    fontSize: FontSize = FontSize.Medium;

    @JsonProperty("Alignment")
    alignment: Alignment = Alignment.Left;
}