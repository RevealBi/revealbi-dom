import { SchemaTypeNames } from "../../Core/Constants/SchemaTypeNames";
import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { DimensionColumn } from "../Primitives/DimensionColumn";
import { MeasureColumn } from "../Primitives/MeasureColumn";
import { HierarchyVisualizationDataSpec } from "./HierarchyVisualizationDataSpec";

export class PivotVisualizationDataSpec extends HierarchyVisualizationDataSpec {
    constructor() {
        super();
        this.schemaTypeName = SchemaTypeNames.PivotVisualizationDataSpecType;
    }

    @JsonProperty("Columns", { type: DimensionColumn })
    columns: DimensionColumn[] = [];

    @JsonProperty("Values", { type: MeasureColumn })
    values: MeasureColumn[] = [];

    @JsonProperty("ShowGrandTotals")
    showGrandTotals: boolean = false;
}