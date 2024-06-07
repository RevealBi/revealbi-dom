import { SchemaTypeNames } from "../../Core/Constants/SchemaTypeNames";
import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { DimensionColumn } from "../Primitives/DimensionColumn";
import { SingleValueLabelsVisualizationDataSpec } from "./SingleValueLabelsVisualizationDataSpec";

export class ChoroplethVisualizationDataSpec extends SingleValueLabelsVisualizationDataSpec {
    constructor() {
        super();
        this.schemaTypeName = SchemaTypeNames.ChoroplethMapVisualizationDataSpecType;
    }

    @JsonProperty("MapColor", { type: DimensionColumn })
    mapColor?: DimensionColumn;
}