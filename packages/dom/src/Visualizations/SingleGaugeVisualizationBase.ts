import { JsonProperty } from "../Core/Serialization/Decorators/JsonProperty";
import { DimensionDataField, NumberDataField } from "./Primitives";
import { DimensionColumn } from "./Primitives/DimensionColumn";
import { MeasureColumn } from "./Primitives/MeasureColumn";
import { VisualizationSettings } from "./Settings/VisualizationSettings"
import { ColumnUtilities } from "./Utilities/ColumnUtilities";
import { Visualization } from "./Visualization";
import { SingleGaugeVisualizationDataSpec } from "./VisualizationSpecs/SingleGaugeVisualizationDataSpec";

export abstract class SingleGaugeVisualizationBase<TSettings extends VisualizationSettings> extends Visualization<TSettings> {

    public get label(): DimensionColumn | undefined {
        return this.visualizationDataSpec.label;
    }
    public set label(value: DimensionColumn | undefined) {
        this.visualizationDataSpec.label = value;
    }

    public get values(): MeasureColumn[] {
        return this.visualizationDataSpec.value;
    }
    public set values(value: MeasureColumn[]) {
        this.visualizationDataSpec.value = value;
    }

    setLabel(field: string | DimensionDataField): this {
        this.label = ColumnUtilities.createDimensionColumn(field);
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

    @JsonProperty("VisualizationDataSpec", { type: SingleGaugeVisualizationDataSpec })
    private visualizationDataSpec: SingleGaugeVisualizationDataSpec = new SingleGaugeVisualizationDataSpec();
}