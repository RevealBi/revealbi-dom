import { SchemaTypeNames } from "../../Core/Constants/SchemaTypeNames";
import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { MeasureColumn } from "../Primitives/MeasureColumn";
import { LabelsVisualizationDataSpec } from "./LabelsVisualizationDataSpec";

export class LinearGaugeVisualizationDataSpec extends LabelsVisualizationDataSpec {
    constructor() {
        super();
        this.schemaTypeName = SchemaTypeNames.LinearGaugeVisualizationDataSpecType;
    }

    @JsonProperty("Value", { type: MeasureColumn })
    value: MeasureColumn[] = [];

    @JsonProperty("Target", { type: MeasureColumn })
    target: MeasureColumn[] = [];
}