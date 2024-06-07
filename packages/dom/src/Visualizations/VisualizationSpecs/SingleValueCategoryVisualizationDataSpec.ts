import { SchemaTypeNames } from "../../Core/Constants/SchemaTypeNames";
import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { DimensionColumn } from "../Primitives/DimensionColumn";
import { MeasureColumn } from "../Primitives/MeasureColumn";
import { LabelsVisualizationDataSpec } from "./LabelsVisualizationDataSpec";

export class SingleValueCategoryVisualizationDataSpec extends LabelsVisualizationDataSpec {
    constructor() {
        super();
        this.schemaTypeName = SchemaTypeNames.SingleValueCategoryVisualizationDataSpecType;
    }

    @JsonProperty("Value", { type: MeasureColumn })
    value: MeasureColumn[] = [];

    @JsonProperty("Category", { type: DimensionColumn })
    category?: DimensionColumn;
}