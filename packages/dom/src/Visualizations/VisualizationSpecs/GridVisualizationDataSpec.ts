import { SchemaTypeNames } from "../../Core/Constants/SchemaTypeNames";
import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { TabularColumn } from "../Primitives/TabularColumn";
import { VisualizationDataSpec } from "./VisualizationDataSpec";

export class GridVisualizationDataSpec extends VisualizationDataSpec {

    constructor() {
        super();
        this.schemaTypeName = SchemaTypeNames.GridVisualizationDataSpecType;
    }

    @JsonProperty("Columns", { type: TabularColumn })
    columns: TabularColumn[] = [];
}