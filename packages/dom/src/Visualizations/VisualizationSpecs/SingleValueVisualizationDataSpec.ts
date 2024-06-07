import { SchemaTypeNames } from "../../Core/Constants/SchemaTypeNames";
import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { MeasureColumn } from "../Primitives/MeasureColumn";
import { VisualizationDataSpec } from "./VisualizationDataSpec";

export class SingleValueVisualizationDataSpec extends VisualizationDataSpec {
    constructor() {
        super();
        this.schemaTypeName = SchemaTypeNames.SingleValueVisualizationDataSpecType;
    }

    @JsonProperty("Value", { type: MeasureColumn })
    value: MeasureColumn[] = [];
}