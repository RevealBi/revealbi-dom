import { SchemaTypeNames } from "../../Core/Constants/SchemaTypeNames";
import { VisualizationTypes } from "../../Core/Constants/VisualizationTypes";
import { KpiGoalPeriod } from "../Enums/KpiGoalPeriod";
import { IndicatorTargetVisualizationDataSpec } from "../VisualizationSpecs/IndicatorTargetVisualizationDataSpec";
import { KpiVisualizationSettingsBase } from "./KpiVisualizationSettingsBase";

export class KpiTargetVisualizationSettings extends KpiVisualizationSettingsBase {
    constructor() {
        super();
        this.schemaTypeName = SchemaTypeNames.IndicatorTargetVisualizationSettingsType;
        this.visualizationType = VisualizationTypes.INDICATOR_TARGET;
    }

    /**
     * Gets or sets the goal period.
     */
    get goalPeriod(): KpiGoalPeriod {
        return this._visualizationDataSpec.dateFilterType;
    }
    set goalPeriod(value: KpiGoalPeriod) {
        this._visualizationDataSpec.dateFilterType = value;
    }

    _visualizationDataSpec!: IndicatorTargetVisualizationDataSpec;
}