import { SchemaTypeNames } from "../../Core/Constants/SchemaTypeNames";
import { SingleValueLabelsVisualizationDataSpec } from "./SingleValueLabelsVisualizationDataSpec";

export class TreeMapVisualizationDataSpec extends SingleValueLabelsVisualizationDataSpec {
    constructor() {
        super();
        this.schemaTypeName = SchemaTypeNames.TreeMapVisualizationDataSpecType;
    }
}