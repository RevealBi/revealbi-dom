import { SchemaTypeNames } from "../../Core/Constants/SchemaTypeNames";
import { VisualizationTypes } from "../../Core/Constants/VisualizationTypes";
import { GridVisualizationSettingsBase } from "./GridVisualizationSettingsBase";

export class GridVisualizationSettings extends GridVisualizationSettingsBase {
    constructor() {
        super();
        this.schemaTypeName = SchemaTypeNames.GridVisualizationSettingsType;
        this.visualizationType = VisualizationTypes.GRID;
    }

    /**
     * Gets whether the first column in the grid is fixed.
     */
    get fixFirstColumn(): boolean {
        return this.style.fixedLeftColumns;
    }

    /**
     * Sets whether the first column in the grid is fixed.
     */
    set fixFirstColumn(value: boolean) {
        this.style.fixedLeftColumns = value;
    }
}