import { SchemaTypeNames } from "../../Core/Constants/SchemaTypeNames";
import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { IndicatorVisualizationType } from "../Enums/IndicatorVisualizationType";
import { IndicatorVisualizationDataSpec } from "./IndicatorVisualizationDataSpec";

export class SparklineVisualizationDataSpec extends IndicatorVisualizationDataSpec {
    constructor() {
        super();
        this.schemaTypeName = SchemaTypeNames.SparklineVisualizationDataSpecType;
        this.indicatorType = IndicatorVisualizationType.LastMonths;
    }

    @JsonProperty("NumberOfPeriods")
    numberOfPeriods: number = 12;

    @JsonProperty("ShowIndicator")
    showIndicator: boolean = true;
}