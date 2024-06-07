import { DimensionDataField, DimensionColumn, TextDataField, NumberDataField, MeasureColumn, DateDataField, TabularColumn } from "../Primitives";

export class ColumnUtilities {

    static createDimensionColumn(field: string | DimensionDataField) {
        return new DimensionColumn(
            typeof field === "string" ? new TextDataField(field) : field
        );
    }

    static createDateDimensionColumn(field: string | DateDataField) {
        return new DimensionColumn(
            typeof field === "string" ? new DateDataField(field) : field
        );
    }

    static createDimensionColumns(...fields: (string | DimensionDataField)[]) {
        const columns: DimensionColumn[] = [];
        for (let field of fields) {
            columns.push(new DimensionColumn(
                typeof field === 'string' ? new TextDataField(field) : field
            ));
        }
        return columns;
    }

    static createTabularColumns(...fields: string[]): TabularColumn[] {
        const columns: TabularColumn[] = [];
        for (let field of fields) {
            columns.push(new TabularColumn(field));
        }
        return columns;
    }

    static createMeasureColumn(field: string | NumberDataField) {
        return new MeasureColumn(
            typeof field === "string" ? new NumberDataField(field) : field
        );
    }

    static createMeasureColumns(...fields: (string | NumberDataField)[]): MeasureColumn[] {
        const columns: MeasureColumn[] = [];
        for (let field of fields) {
            columns.push(new MeasureColumn(
                typeof field === 'string' ? new NumberDataField(field) : field
            ));
        }
        return columns;
    }
}