import { SchemaTypeNames } from "../../Core/Constants/SchemaTypeNames";
import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { DimensionColumn } from "../Primitives/DimensionColumn";
import { MeasureColumn } from "../Primitives/MeasureColumn";
import { LabelsVisualizationDataSpec } from "./LabelsVisualizationDataSpec";

export class CategoryVisualizationDataSpec extends LabelsVisualizationDataSpec {
    constructor() {
        super();
        this.schemaTypeName = SchemaTypeNames.CategoryVisualizationDataSpecType;
    }

    @JsonProperty("Category", { type: DimensionColumn })
    category?: DimensionColumn;

    @JsonProperty("Values", { type: MeasureColumn })
    values: MeasureColumn[] = [];
}