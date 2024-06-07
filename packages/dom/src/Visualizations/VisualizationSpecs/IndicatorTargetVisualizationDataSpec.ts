import { SchemaTypeNames } from "../../Core/Constants/SchemaTypeNames";
import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { DateRange } from "../../Primitives/DateRange";
import { KpiGoalPeriod } from "../Enums/KpiGoalPeriod";
import { MeasureColumn } from "../Primitives/MeasureColumn";
import { IndicatorBaseVisualizationDataSpec } from "./IndicatorBaseVisualizationDataSpec";

export class IndicatorTargetVisualizationDataSpec extends IndicatorBaseVisualizationDataSpec {
    constructor() {
        super();
        this.schemaTypeName = SchemaTypeNames.IndicatorTargetVisualizationDataSpecType;
    }

    @JsonProperty("Target", { type: MeasureColumn })
    target: MeasureColumn[] = [];

    @JsonProperty("DateFilterType")
    dateFilterType: KpiGoalPeriod = KpiGoalPeriod.YearToDate;

    @JsonProperty("CustomDateRange", { type: DateRange })
    customDateRange?: DateRange;
}