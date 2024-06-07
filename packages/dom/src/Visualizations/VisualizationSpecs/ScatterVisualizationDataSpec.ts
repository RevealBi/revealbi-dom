import { SchemaTypeNames } from "../../Core/Constants/SchemaTypeNames";
import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { DimensionColumn } from "../Primitives/DimensionColumn";
import { MeasureColumn } from "../Primitives/MeasureColumn";
import { LabelsVisualizationDataSpec } from "./LabelsVisualizationDataSpec";

export class ScatterVisualizationDataSpec extends LabelsVisualizationDataSpec {
    constructor() {
        super();
        this.schemaTypeName = SchemaTypeNames.ScatterVisualizationDataSpecType;
    }

    @JsonProperty("Category", { type: DimensionColumn })
    category?: DimensionColumn;

    @JsonProperty("XAxis", { type: MeasureColumn })
    xAxis: MeasureColumn[] = [];

    @JsonProperty("YAxis", { type: MeasureColumn })
    yAxis: MeasureColumn[] = [];
}