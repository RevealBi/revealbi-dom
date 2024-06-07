import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { AdHocExpandedElement } from "../Primitives/AdHocExpandedElement";
import { DimensionColumn } from "../Primitives/DimensionColumn";
import { VisualizationDataSpec } from "./VisualizationDataSpec";

export class HierarchyVisualizationDataSpec extends VisualizationDataSpec{

    @JsonProperty("AdHocFields")
    adHocFields?: number;

    @JsonProperty("FormatVersion")
    formatVersion: number = 0;    

    @JsonProperty("AdHocExpandedElements", { type: AdHocExpandedElement })
    adHocExpandedElements: AdHocExpandedElement[] = [];

    @JsonProperty("Rows", { type: DimensionColumn })
    rows: DimensionColumn[] = [];
}