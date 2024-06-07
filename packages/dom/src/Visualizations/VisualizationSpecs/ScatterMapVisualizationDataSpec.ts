import { SchemaTypeNames } from "../../Core/Constants/SchemaTypeNames";
import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { DimensionColumn } from "../Primitives/DimensionColumn";
import { MeasureColumn } from "../Primitives/MeasureColumn";
import { VisualizationDataSpec } from "./VisualizationDataSpec";

export class ScatterMapVisualizationDataSpec extends VisualizationDataSpec {
    constructor() {
        super();
        this.schemaTypeName = SchemaTypeNames.ScatterMapVisualizationDataSpecType;
    }

    @JsonProperty("IsSingleLocationField")
    isSingleLocationField: boolean = false;

    @JsonProperty("IsColorByValue")
    isColorByValue: boolean = true;

    @JsonProperty("Location", { type: DimensionColumn })
    location?: DimensionColumn;

    @JsonProperty("Longitude", { type: DimensionColumn })
    longitude?: DimensionColumn;

    @JsonProperty("Label", { type: DimensionColumn })
    label?: DimensionColumn;

    @JsonProperty("MapColorCategory", { type: DimensionColumn })
    mapColorCategory?: DimensionColumn;

    @JsonProperty("MapColor", { type: MeasureColumn })
    mapColor: MeasureColumn[] = [];

    @JsonProperty("Radius", { type: MeasureColumn })
    radius: MeasureColumn[] = [];
}