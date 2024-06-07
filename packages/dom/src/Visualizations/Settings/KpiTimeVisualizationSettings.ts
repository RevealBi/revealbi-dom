import { SchemaTypeNames } from "../../Core/Constants/SchemaTypeNames";
import { VisualizationTypes } from "../../Core/Constants/VisualizationTypes";
import { IndicatorVisualizationType } from "../Enums/IndicatorVisualizationType";
import { KpiTimePeriod } from "../Enums/KpiTimePeriod";
import { IndicatorVisualizationDataSpec } from "../VisualizationSpecs/IndicatorVisualizationDataSpec";
import { KpiVisualizationSettingsBase } from "./KpiVisualizationSettingsBase";

export class KpiTimeVisualizationSettings extends KpiVisualizationSettingsBase {
    constructor() {
        super();
        this.schemaTypeName = SchemaTypeNames.IndicatorVisualizationSettingsType;
        this.visualizationType = VisualizationTypes.INDICATOR;
    }

    _visualizationDataSpec!: IndicatorVisualizationDataSpec;

    get timePeriod(): KpiTimePeriod {
        return this.convertIndicatorVisualizationTypeToKpiTimePeriod(this._visualizationDataSpec.indicatorType);
    }

    set timePeriod(value: KpiTimePeriod) {
        this._visualizationDataSpec.indicatorType = this.convertKpiTimePeriodToIndicatorVisualizationType(value);
    }

    private convertKpiTimePeriodToIndicatorVisualizationType(timePeriod: KpiTimePeriod): IndicatorVisualizationType {
        switch (timePeriod) {
            case KpiTimePeriod.MonthToDatePreviousMonth:
                return IndicatorVisualizationType.MonthToDatePreviousMonth;
            case KpiTimePeriod.MonthToDatePreviousYear:
                return IndicatorVisualizationType.MonthToDatePreviousYear;
            case KpiTimePeriod.QuarterToDatePreviousQuarter:
                return IndicatorVisualizationType.QuarterToDatePreviousQuarter;
            case KpiTimePeriod.QuarterToDatePreviousYear:
                return IndicatorVisualizationType.QuarterToDatePreviousYear;
            case KpiTimePeriod.YearToDatePreviousYear:
                return IndicatorVisualizationType.YearToDatePreviousYear;
            default:
                return IndicatorVisualizationType.MonthToDatePreviousMonth;
        }
    }

    private convertIndicatorVisualizationTypeToKpiTimePeriod(visualizationType: IndicatorVisualizationType): KpiTimePeriod {
        switch (visualizationType) {
            case IndicatorVisualizationType.MonthToDatePreviousMonth:
                return KpiTimePeriod.MonthToDatePreviousMonth;
            case IndicatorVisualizationType.MonthToDatePreviousYear:
                return KpiTimePeriod.MonthToDatePreviousYear;
            case IndicatorVisualizationType.QuarterToDatePreviousQuarter:
                return KpiTimePeriod.QuarterToDatePreviousQuarter;
            case IndicatorVisualizationType.QuarterToDatePreviousYear:
                return KpiTimePeriod.QuarterToDatePreviousYear;
            case IndicatorVisualizationType.YearToDatePreviousYear:
                return KpiTimePeriod.YearToDatePreviousYear;
            default:
                return KpiTimePeriod.MonthToDatePreviousMonth;
        }
    }
}
