import { JsonProperty } from "../Core/Serialization/Decorators/JsonProperty";
import { DataSourceItem } from "../Data/DataSourceItem";
import { ChartType } from "./Enums";
import { DimensionDataField, NumberDataField } from "./Primitives";
import { DimensionColumn } from "./Primitives/DimensionColumn";
import { MeasureColumn } from "./Primitives/MeasureColumn";
import { ChoroplethVisualizationSettings } from "./Settings/ChoroplethVisualizationSettings";
import { TabularVisualizationBase } from "./TabularVisualizationBase";
import { ColumnUtilities } from "./Utilities/ColumnUtilities";
import { ChoroplethVisualizationDataSpec } from "./VisualizationSpecs/ChoroplethVisualizationDataSpec";

export class ChoroplethVisualization extends TabularVisualizationBase<ChoroplethVisualizationSettings> {

    constructor(title: string, dataSourceItem: DataSourceItem) {
        super(title, dataSourceItem)
        this.settings = new ChoroplethVisualizationSettings();
        this.chartType = ChartType.Choropleth;
    }

    @JsonProperty("VisualizationDataSpec", { type: ChoroplethVisualizationDataSpec })
    private visualizationDataSpec: ChoroplethVisualizationDataSpec = new ChoroplethVisualizationDataSpec();

    public get map(): string | undefined {
        return this.settings.region;
    }
    public set map(value: string | undefined) {
        this.settings.region = value;
    }

    public get locations(): DimensionColumn[] {
        return this.visualizationDataSpec.rows;
    }
    public set locations(value: DimensionColumn[]) {
        this.visualizationDataSpec.rows = value;
    }

    public get mapColor(): DimensionColumn | undefined {
        return this.visualizationDataSpec.mapColor;
    }
    public set mapColor(value: DimensionColumn | undefined) {
        this.visualizationDataSpec.mapColor = value;
    }

    public get values(): MeasureColumn[] {
        return this.visualizationDataSpec.value;
    }
    public set values(value: MeasureColumn[]) {
        this.visualizationDataSpec.value = value;
    }  

    setLocation(field: string | DimensionDataField): this {
        this.locations = ColumnUtilities.createDimensionColumns(field);
        return this;
    }

    setMap(map: string): this {
        this.map = map;
        return this;
    }
    
    setValue(field: string | NumberDataField): this {
        this.values = ColumnUtilities.createMeasureColumns(field);
        return this;
    }

    setValues(...fields: (string | NumberDataField)[]): this {
        this.values = ColumnUtilities.createMeasureColumns(...fields);
        return this;
    }

    configureSettings(callback: (settings: ChoroplethVisualizationSettings) => void): this {
        callback(this.settings);
        return this;
    }
}