import { JsonProperty } from "../Core/Serialization/Decorators/JsonProperty";
import { DimensionColumn, MeasureColumn, DimensionDataField, NumberDataField, NumberFormatting } from "./Primitives";
import { FinancialVisualizationSettingsBase } from "./Settings/FinancialVisualizationSettingsBase";
import { TabularVisualizationBase } from "./TabularVisualizationBase";
import { ColumnUtilities } from "./Utilities/ColumnUtilities";
import { FinancialVisualizationDataSpec } from "./VisualizationSpecs/FinancialVisualizationDataSpec";

export abstract class FinancialVisualizationBase<TSettings extends FinancialVisualizationSettingsBase> extends TabularVisualizationBase<TSettings> {

    @JsonProperty("VisualizationDataSpec", { type: FinancialVisualizationDataSpec })
    private visualizationDataSpec: FinancialVisualizationDataSpec = new FinancialVisualizationDataSpec();

    public get labels(): DimensionColumn[] {
        return this.visualizationDataSpec.rows;
    }
    public set labels(value: DimensionColumn[]) {
        this.visualizationDataSpec.rows = value;
    }

    public get opens(): MeasureColumn[] {
        return this.visualizationDataSpec.open;
    }
    public set opens(value: MeasureColumn[]) {
        this.visualizationDataSpec.open = value;
    }

    public get highs(): MeasureColumn[] {
        return this.visualizationDataSpec.high;
    }
    public set highs(value: MeasureColumn[]) {
        this.visualizationDataSpec.high = value;
    }

    public get lows(): MeasureColumn[] {
        return this.visualizationDataSpec.low;
    }
    public set lows(value: MeasureColumn[]) {
        this.visualizationDataSpec.low = value;
    }

    public get closes(): MeasureColumn[] {
        return this.visualizationDataSpec.close;
    }
    public set closes(value: MeasureColumn[]) {
        this.visualizationDataSpec.close = value;
    }

    setLabel(field: string | DimensionDataField): this {
        this.labels = ColumnUtilities.createDimensionColumns(field);
        return this;
    }

    setLabels(...fields: (string | DimensionDataField)[]): this {
        this.labels = ColumnUtilities.createDimensionColumns(...fields);
        return this;
    }

    setClose(field: string | NumberDataField): this {
        return this.setCloses(field);
    }

    setCloses(...fields: (string | NumberDataField)[]): this {
        this.closes = this.createMeasureColumns(fields);;
        return this;
    }

    setHigh(field: string | NumberDataField): this {
        return this.setHighs(field);
    }

    setHighs(...fields: (string | NumberDataField)[]): this {
        this.highs = this.createMeasureColumns(fields);
        return this;
    }

    setLow(field: string | NumberDataField): this {
        return this.setLows(field);
    }

    setLows(...fields: (string | NumberDataField)[]): this {
        this.lows = this.createMeasureColumns(fields);;
        return this;
    }

    setOpen(field: string | NumberDataField): this {
        return this.setOpens(field);
    }

    setOpens(...fields: (string | NumberDataField)[]): this {
        this.opens = this.createMeasureColumns(fields);;
        return this;
    }

    private createMeasureColumns(fields: (string | NumberDataField)[]): MeasureColumn[] {
        const columns: MeasureColumn[] = [];
        for (let field of fields) {
            if (typeof field === 'string') {
                field = new NumberDataField(field);
            }

            if (field.formatting === null) {
                field.formatting = this.getFinancialNumberFormatting();
            }

            columns.push(new MeasureColumn(field));
        }
        return columns;
    }

    getFinancialNumberFormatting(): NumberFormatting {
        let formatting = new NumberFormatting();
        formatting.decimalDigits = 0;
        formatting.showGroupingSeparator = true;
        return formatting;
    }
}