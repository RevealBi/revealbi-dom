import { JsonProperty } from "../Core/Serialization/Decorators/JsonProperty";
import { FixedLine, NumberDataField } from "./Primitives";
import { DimensionColumn } from "./Primitives/DimensionColumn";
import { DimensionDataField } from "./Primitives/DimensionDataField";
import { MeasureColumn } from "./Primitives/MeasureColumn";
import { VisualizationSettings } from "./Settings/VisualizationSettings"
import { ColumnUtilities } from "./Utilities/ColumnUtilities";
import { Visualization } from "./Visualization";
import { CategoryVisualizationDataSpec } from "./VisualizationSpecs/CategoryVisualizationDataSpec";

export abstract class CategoryVisualizationBase<TSettings extends VisualizationSettings> extends Visualization<TSettings>
    {
        @JsonProperty("VisualizationDataSpec", { type: CategoryVisualizationDataSpec })
        private visualizationDataSpec: CategoryVisualizationDataSpec = new CategoryVisualizationDataSpec();

        get category(): DimensionColumn | undefined {
            return this.visualizationDataSpec.category;
        }
        set category(value: DimensionColumn | undefined) {
            this.visualizationDataSpec.category = value;
        }

        get fixedLines(): FixedLine[] {
            return this.visualizationDataSpec.fixedLines;
        }
        set fixedLines(value: FixedLine[]) {
            this.visualizationDataSpec.fixedLines = value;
        }

        get labels() {
            return this.visualizationDataSpec.rows;
        }
        set labels(labels: DimensionColumn[]) {
            this.visualizationDataSpec.rows = labels;
        }

        get values() {
            return this.visualizationDataSpec.values;
        }
        set values(values: MeasureColumn[]) {
            this.visualizationDataSpec.values = values;
        }

        setCategory(field: string | DimensionDataField): this {            
            this.category = ColumnUtilities.createDimensionColumn(field);
            return this;
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