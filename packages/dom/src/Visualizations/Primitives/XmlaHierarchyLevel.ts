import { SchemaTypeNames } from "../../Core/Constants/SchemaTypeNames";
import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { XmlaDimensionElement } from "./XmlaDimensionElement";

export class XmlaHierarchyLevel extends XmlaDimensionElement {
    constructor() {
        super();
        this.schemaTypeName = SchemaTypeNames.XmlaHierarchyLevelType;
    }

    @JsonProperty("HierarchyUniqueName")
    hierarchyUniqueName?: string;

    @JsonProperty("LevelNumber")
    levelNumber?: number;

    @JsonProperty("Cardinality")
    cardinality?: number;
}
