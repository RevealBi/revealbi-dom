import { JsonProperty } from "../Core/Serialization/Decorators/JsonProperty";
import { DataSourceItem } from "../Data/DataSourceItem";
import { ChartType } from "./Enums";
import { DimensionDataField, NumberDataField, TextDataField } from "./Primitives";
import { DimensionColumn } from "./Primitives/DimensionColumn";
import { MeasureColumn } from "./Primitives/MeasureColumn";
import { ScatterMapVisualizationSettings } from "./Settings/ScatterMapVisualizationSettings";
import { TabularVisualizationBase } from "./TabularVisualizationBase";
import { ColumnUtilities } from "./Utilities/ColumnUtilities";
import { ScatterMapVisualizationDataSpec } from "./VisualizationSpecs/ScatterMapVisualizationDataSpec";

export class ScatterMapVisualization extends TabularVisualizationBase<ScatterMapVisualizationSettings> {

    constructor(title: string, dataSourceItem: DataSourceItem) {
        super(title, dataSourceItem)
        this.settings = new ScatterMapVisualizationSettings();
        this.chartType = ChartType.ScatterMap;
    }

    @JsonProperty("VisualizationDataSpec", { type: ScatterMapVisualizationDataSpec })
    private visualizationDataSpec: ScatterMapVisualizationDataSpec = new ScatterMapVisualizationDataSpec();

    public get label(): DimensionColumn | undefined {
        return this.visualizationDataSpec.label;
    }
    public set label(value: DimensionColumn | undefined) {
        this.visualizationDataSpec.label = value;
    }

    public get map(): string | undefined {
        return this.settings.region;
    }
    public set map(value: string | undefined) {
        this.settings.region = value;
    }

    public get latitude(): DimensionColumn | undefined {
        return this.visualizationDataSpec.location;
    }
    public set latitude(value: DimensionColumn | undefined) {
        this.visualizationDataSpec.location = value;
    }

    public get longitude(): DimensionColumn | undefined {
        return this.visualizationDataSpec.longitude;
    }
    public set longitude(value: DimensionColumn | undefined) {
        this.visualizationDataSpec.longitude = value;
    }

    public get mapColor(): MeasureColumn[] {
        return this.visualizationDataSpec.mapColor;
    }
    public set mapColor(value: MeasureColumn[]) {
        this.visualizationDataSpec.mapColor = value;
    }

    public get mapColorCategory(): DimensionColumn | undefined {
        return this.visualizationDataSpec.mapColorCategory;
    }
    public set mapColorCategory(value: DimensionColumn | undefined) {
        this.visualizationDataSpec.mapColorCategory = value;
    }

    public get bubbleRadius(): MeasureColumn[] {
        return this.visualizationDataSpec.radius;
    }
    public set bubbleRadius(value: MeasureColumn[]) {
        this.visualizationDataSpec.radius = value;
    }

    setColorByCategory(field: string | TextDataField): this {
        if (typeof field === "string"){
            field = new TextDataField(field);
        }

        this.visualizationDataSpec.isColorByValue = false;
        this.visualizationDataSpec.mapColorCategory = new DimensionColumn(field);
        return this;
    }

    setColorByValue(field: string | NumberDataField): this {
        if (typeof field === "string"){
            field = new NumberDataField(field);
        }

        this.visualizationDataSpec.isColorByValue = true;
        this.visualizationDataSpec.mapColorCategory = undefined;
        this.mapColor = [ new MeasureColumn(field) ];
        return this;
    }

    setLabel(field: string | DimensionDataField): this {
        this.label = ColumnUtilities.createDimensionColumn(field);
        return this;
    }

    setLatitude(field: string | DimensionDataField): this {            
        this.latitude = ColumnUtilities.createDimensionColumn(field);
        return this;
    }

    setLongitude(field: string | DimensionDataField): this {            
        this.longitude = ColumnUtilities.createDimensionColumn(field);
        return this;
    }

    setMap(map: string): this {
        this.map = map;
        return this;
    }

    configureSettings(callback: (settings: ScatterMapVisualizationSettings) => void): this {
        callback(this.settings);
        return this;
    }
}