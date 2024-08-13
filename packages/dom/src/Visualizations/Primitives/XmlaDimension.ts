import { SchemaTypeNames } from "../../Core/Constants/SchemaTypeNames";
import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { XmlaDimensionElement } from "./XmlaDimensionElement";

export class XmlaDimension extends XmlaDimensionElement {
    constructor() {
        super();
        this.schemaTypeName = SchemaTypeNames.XmlaDimensionType;
    }

    @JsonProperty("DefaultHierarchy")
    defaultHierarchy?: string;
}
