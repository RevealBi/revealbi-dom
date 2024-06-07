import { SchemaTypeNames } from "../../Core/Constants/SchemaTypeNames";
import { VisualizationTypes } from "../../Core/Constants/VisualizationTypes";
import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { RdashChartType } from "../Enums/ChartType";
import { VisualizationSettings } from "./VisualizationSettings";

export abstract class ChartVisualizationSettingsBase extends VisualizationSettings {
    constructor() {
        super();
        this.schemaTypeName = SchemaTypeNames.ChartVisualizationSettingsType;
        this.visualizationType = VisualizationTypes.CHART;
    }

    /**
     * Gets or sets the chart type of the Visualization. This is only used to map to the RDASH JSON schema and should never be exposed on the public API
     * There is a separate property for the chart type on the public API located on the VisualizationBase class.
     */
    @JsonProperty("ChartType")
    protected chartType: RdashChartType = RdashChartType.Area;
}