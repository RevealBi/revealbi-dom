import { SchemaTypeNames } from "../../Core/Constants/SchemaTypeNames";
import { CategoryVisualizationDataSpec } from "./CategoryVisualizationDataSpec";

export class TimeSeriesVisualizationDataSpec extends CategoryVisualizationDataSpec {
    constructor() {
        super();
        this.schemaTypeName = SchemaTypeNames.TimeSeriesVisualizationDataSpecType;
    }
}