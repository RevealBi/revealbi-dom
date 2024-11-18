import { SchemaTypeNames } from "../../Core/Constants/SchemaTypeNames";
import { VisualizationTypes } from "../../Core/Constants/VisualizationTypes";
import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { GridVisualizationSettingsBase } from "./GridVisualizationSettingsBase";

export class GridVisualizationSettings extends GridVisualizationSettingsBase {
    constructor() {
        super();
        this.schemaTypeName = SchemaTypeNames.GridVisualizationSettingsType;
        this.visualizationType = VisualizationTypes.GRID;
    }

    /**
     * Gets or sets whether the grid should have paging enabled.
     * Paging is supported only when ProcessDataOnServer is set to true and is not compatible with Data Blending.
     * Supported data sources include: Athena, BigQuery, MySQL, Oracle, PostgreSQL, SQL Server, and SyBase.
     */
    @JsonProperty("PagedRows")
    isPagingEnabled: boolean = true;

    /**
     * Gets or sets the number of rows to display in the grid.
     */
    @JsonProperty("PagedRowsSize")
    pageSize: number = 50;

    /**
     * Gets whether the first column in the grid is fixed.
     */
    get isFirstColumnFixed(): boolean {
        return this.style.fixedLeftColumns;
    }

    /**
     * Sets whether the first column in the grid is fixed.
     */
    set isFirstColumnFixed(value: boolean) {
        this.style.fixedLeftColumns = value;
    }
}