import { SchemaTypeNames } from "../../Core/Constants/SchemaTypeNames";
import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { DimensionColumn } from "../Primitives/DimensionColumn";
import { SingleValueVisualizationDataSpec } from "./SingleValueVisualizationDataSpec";

export class SingleGaugeVisualizationDataSpec extends SingleValueVisualizationDataSpec {
    constructor() {
        super();
        this.schemaTypeName = SchemaTypeNames.SingleGaugeVisualizationDataSpecType;
    }

    @JsonProperty("Label", { type: DimensionColumn })
    label?: DimensionColumn;
}