import { SchemaTypeNames } from "../../Core/Constants/SchemaTypeNames";
import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { MeasureColumn } from "../Primitives/MeasureColumn";
import { LabelsVisualizationDataSpec } from "./LabelsVisualizationDataSpec";

export class FinancialVisualizationDataSpec extends LabelsVisualizationDataSpec {
    constructor() {
        super();
        this.schemaTypeName = SchemaTypeNames.FinancialVisualizationDataSpecType;
    }

    @JsonProperty("Open", { type: MeasureColumn })
    open: MeasureColumn[] = [];

    @JsonProperty("High", { type: MeasureColumn })
    high: MeasureColumn[] = [];

    @JsonProperty("Low", { type: MeasureColumn })
    low: MeasureColumn[] = [];

    @JsonProperty("Close", { type: MeasureColumn })
    close: MeasureColumn[] = [];
}