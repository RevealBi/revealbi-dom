import { SchemaTypeNames } from "../../Core/Constants/SchemaTypeNames";
import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { XmlaDimensionElement } from "./XmlaDimensionElement";

export class XmlaHierarchy extends XmlaDimensionElement {

    constructor() {
        super();
        this.schemaTypeName = SchemaTypeNames.XmlaHierarchyType;
    }
    
    @JsonProperty("Origin")
    origin?: number;
    
    @JsonProperty("Description")
    description?: string;

    @JsonProperty("Cardinality")
    cardinality?: number;

    @JsonProperty("DisplayFolder")
    displayFolder?: string;

    @JsonProperty("AllMember")
    allMember?: string;

    @JsonProperty("DefaultMember")
    defaultMember?: string;
}
