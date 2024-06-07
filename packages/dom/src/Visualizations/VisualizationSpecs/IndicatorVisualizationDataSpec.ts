import { SchemaTypeNames } from "../../Core/Constants/SchemaTypeNames";
import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { IndicatorVisualizationType } from "../Enums/IndicatorVisualizationType";
import { IndicatorBaseVisualizationDataSpec } from "./IndicatorBaseVisualizationDataSpec";

export class IndicatorVisualizationDataSpec extends IndicatorBaseVisualizationDataSpec {
    constructor() {
        super();
        this.schemaTypeName = SchemaTypeNames.IndicatorVisualizationDataSpecType;
    }

    @JsonProperty("IndicatorType")
    indicatorType: IndicatorVisualizationType = IndicatorVisualizationType.YearToDatePreviousYear;
}