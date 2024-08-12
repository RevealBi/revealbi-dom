import { SchemaTypeNames } from "../../Core/Constants/SchemaTypeNames";
import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { XmlaDimensionElement } from "./XmlaDimensionElement";

export class XmlaSet extends XmlaDimensionElement {
    constructor() {
        super();
        this.schemaTypeName = SchemaTypeNames.XmlaDataSpecType;
    }

    @JsonProperty("HierarchyUniqueName")
    hierarchyUniqueName?: string;

    @JsonProperty("DisplayFolder")
    displayFolder?: string;
}
