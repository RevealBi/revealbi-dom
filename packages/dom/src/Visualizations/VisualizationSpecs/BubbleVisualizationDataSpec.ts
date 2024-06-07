import { SchemaTypeNames } from "../../Core/Constants/SchemaTypeNames";
import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { MeasureColumn } from "../Primitives/MeasureColumn";
import { ScatterVisualizationDataSpec } from "./ScatterVisualizationDataSpec";

export class BubbleVisualizationDataSpec extends ScatterVisualizationDataSpec
{
    constructor()    {
        super();
        this.schemaTypeName = SchemaTypeNames.BubbleVisualizationDataSpecType;
    }

    @JsonProperty("Radius", { type: MeasureColumn })
    radius: MeasureColumn[] = [];
}