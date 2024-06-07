import { SchemaTypeNames } from "../../Core/Constants/SchemaTypeNames";
import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { MeasureColumn } from "../Primitives/MeasureColumn";
import { LabelsVisualizationDataSpec } from "./LabelsVisualizationDataSpec";

export class SingleValueLabelsVisualizationDataSpec extends LabelsVisualizationDataSpec
{
    constructor()    {
        super();
        this.schemaTypeName = SchemaTypeNames.SingleValueLabelsVisualizationDataSpecType;
    }

    @JsonProperty("Value", { type: MeasureColumn })
    value: MeasureColumn[] = [];
}