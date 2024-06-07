import { SchemaTypeNames } from "../../Core/Constants/SchemaTypeNames";
import { VisualizationTypes } from "../../Core/Constants/VisualizationTypes";
import { PivotVisualizationDataSpec } from "../VisualizationSpecs/PivotVisualizationDataSpec";
import { GridVisualizationSettingsBase } from "./GridVisualizationSettingsBase";

export class PivotVisualizationSettings extends GridVisualizationSettingsBase {
    constructor() {
        super();
        this.schemaTypeName = SchemaTypeNames.PivotVisualizationSettingsType;
        this.visualizationType = VisualizationTypes.PIVOT;
    }

    //todo: can we hide this from the pubic API?
    _visualizationDataSpec!: PivotVisualizationDataSpec;

    public get showGrandTotals(): boolean {
        return this._visualizationDataSpec.showGrandTotals;
    }
    public set showGrandTotals(value: boolean) {
        this._visualizationDataSpec.showGrandTotals = value;
    }
}