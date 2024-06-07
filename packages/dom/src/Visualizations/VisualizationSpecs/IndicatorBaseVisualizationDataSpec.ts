import { SchemaTypeNames } from "../../Core/Constants/SchemaTypeNames";
import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { DimensionColumn } from "../Primitives/DimensionColumn";
import { MeasureColumn } from "../Primitives/MeasureColumn";
import { LabelsVisualizationDataSpec } from "./LabelsVisualizationDataSpec";

export class IndicatorBaseVisualizationDataSpec extends LabelsVisualizationDataSpec {
    constructor() {
        super();
        this.schemaTypeName = SchemaTypeNames.IndicatorBaseVisualizationDataSpecType;
    }

    @JsonProperty("Date", { type: DimensionColumn })
    date?: DimensionColumn;

    @JsonProperty("Value", { type: MeasureColumn })
    value: MeasureColumn[] = [];
}