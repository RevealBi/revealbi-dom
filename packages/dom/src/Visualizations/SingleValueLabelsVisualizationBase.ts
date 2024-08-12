import { JsonProperty } from "../Core/Serialization/Decorators/JsonProperty";
import { DimensionDataField, NumberDataField } from "./Primitives";
import { DimensionColumn } from "./Primitives/DimensionColumn";
import { MeasureColumn } from "./Primitives/MeasureColumn";
import { VisualizationSettings } from "./Settings/VisualizationSettings";
import { Visualization } from "./Visualization";
import { ColumnUtilities } from "./Utilities/ColumnUtilities";
import { SingleValueLabelsVisualizationDataSpec } from "./VisualizationSpecs/SingleValueLabelsVisualizationDataSpec";

export abstract class SingleValueLabelsVisualizationBase<TSettings extends VisualizationSettings> extends Visualization<TSettings> {
    @JsonProperty("VisualizationDataSpec", { type: SingleValueLabelsVisualizationDataSpec })
    private visualizationDataSpec: SingleValueLabelsVisualizationDataSpec = new SingleValueLabelsVisualizationDataSpec();

    public get labels(): DimensionColumn[] {
        return this.visualizationDataSpec.rows;
    }
    public set labels(value: DimensionColumn[]) {
        this.visualizationDataSpec.rows = value;
    }

    public get values(): MeasureColumn[] {
        return this.visualizationDataSpec.value;
    }
    public set values(value: MeasureColumn[]) {
        this.visualizationDataSpec.value = value;
    }

    setLabel(field: string | DimensionDataField): this {
        this.labels = ColumnUtilities.createDimensionColumns(field);
        return this;
    }

    setLabels(...fields: (string | DimensionDataField)[]): this {
        this.labels = ColumnUtilities.createDimensionColumns(...fields);
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
}