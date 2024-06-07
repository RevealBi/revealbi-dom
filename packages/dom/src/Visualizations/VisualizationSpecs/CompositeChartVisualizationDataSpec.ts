import { SchemaTypeNames } from "../../Core/Constants/SchemaTypeNames";
import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { MeasureColumn } from "../Primitives/MeasureColumn";
import { LabelsVisualizationDataSpec } from "./LabelsVisualizationDataSpec";

export class CompositeChartVisualizationDataSpec extends LabelsVisualizationDataSpec {
    constructor() {
        super();
        this.schemaTypeName = SchemaTypeNames.CompositeChartVisualizationDataSpecType;
    }

    @JsonProperty("Chart1", { type: MeasureColumn })
    chart1: MeasureColumn[] = [];

    @JsonProperty("Chart2", { type: MeasureColumn })
    chart2: MeasureColumn[] = [];
}