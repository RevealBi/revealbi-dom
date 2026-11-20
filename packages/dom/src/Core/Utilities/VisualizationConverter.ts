import { IVisualization } from "../../Visualizations/Interfaces/IVisualization";
import { ChartType } from "../../Visualizations/Enums";
import { TabularColumn } from "../../Visualizations/Primitives/TabularColumn";
import { IField } from "../../Visualizations/Interfaces/IField";
import { CategoryVisualizationBase } from "../../Visualizations/CategoryVisualizationBase";
import { GridVisualization } from "../../Visualizations/GridVisualization";
import { TabularDataDefinition } from "../../Visualizations/DataDefinitions/TabularDataDefinition";
import { FinancialVisualizationBase } from "../../Visualizations/FinancialVisualizationBase";
import { SingleGaugeVisualizationBase } from "../../Visualizations/SingleGaugeVisualizationBase";
import { LinearGaugeVisualizationBase } from "../../Visualizations/LinearGaugeVisualizationBase";
import { SingleValueLabelsVisualizationBase } from "../../Visualizations/SingleValueLabelsVisualizationBase";
import { DimensionColumn } from "../../Visualizations/Primitives/DimensionColumn";
import { MeasureColumn } from "../../Visualizations/Primitives/MeasureColumn";
import { BubbleVisualization } from "../../Visualizations/BubbleVisualization";
import { ScatterVisualization } from "../../Visualizations/ScatterVisualization";
import { ScatterMapVisualization } from "../../Visualizations/ScatterMapVisualization";
import { ChoroplethVisualization } from "../../Visualizations/ChoroplethVisualization";
import { SparklineVisualization } from "../../Visualizations/SparklineVisualization";
import { TreeMapVisualization } from "../../Visualizations/TreeMapVisualization";
import { PivotVisualization } from "../../Visualizations/PivotVisualization";
import { TimeSeriesVisualization } from "../../Visualizations/TimeSeriesVisualization";
import { KpiTimeVisualization } from "../../Visualizations/KpiTimeVisualization";
import { KpiTargetVisualization } from "../../Visualizations/KpiTargetVisualization";

export interface GridConversionOptions {
    includeAllFields?: boolean;
}

export class VisualizationConverter {
    
    static toGrid(sourceViz: IVisualization, options?: GridConversionOptions): GridVisualization | null {
        if (sourceViz === undefined || sourceViz === null) {
            console.warn("Source visualization is null or undefined.");
            return null;
        }

        if (!VisualizationConverter.canConvertToGrid(sourceViz.chartType)) {
            console.warn(`Visualization of type ${sourceViz.chartType} cannot be converted to Grid.`);
            return null;
        }

        const tabularDataDef = sourceViz.dataDefinition as TabularDataDefinition;
        if (!tabularDataDef || !tabularDataDef.dataSourceItem) {
            console.warn("Source visualization does not have a valid TabularDataDefinition or DataSourceItem.");
            return null;
        }

        if (tabularDataDef.dataSourceItem.fields.length === 0) {
            tabularDataDef.dataSourceItem.fields = tabularDataDef.fields;
        }

        const columns = options?.includeAllFields 
            ? VisualizationConverter.extractAllFields(tabularDataDef)
            : VisualizationConverter.extractColumns(sourceViz);
            
        if (!columns || columns.length === 0) {
            return null;
        }

        const gridViz = new GridVisualization(
            sourceViz.title || 'Grid',
            tabularDataDef.dataSourceItem
        );

        gridViz.columns = columns;
        VisualizationConverter.copyHiddenFields(gridViz, tabularDataDef.fields);
        gridViz.id = sourceViz.id;
        gridViz.backgroundColor = sourceViz.backgroundColor;
        gridViz.isTitleVisible = sourceViz.isTitleVisible;
        gridViz.columnSpan = sourceViz.columnSpan;
        gridViz.rowSpan = sourceViz.rowSpan;

        return gridViz;
    }

    private static copyHiddenFields(gridViz: GridVisualization, sourceFields: IField[]): void {
        if (!(gridViz.dataDefinition instanceof TabularDataDefinition)) {
            return;
        }
        const hiddenFieldNames = new Set(sourceFields.filter(field => field.isHidden).map(field => field.fieldName));
        gridViz.dataDefinition.fields.forEach(field => {
            if (hiddenFieldNames.has(field.fieldName)) {
                field.isHidden = true;
            }
        });
    }

    private static canConvertToGrid(chartType: ChartType): boolean {
        return chartType !== ChartType.TextBox && 
               chartType !== ChartType.Custom && 
               chartType !== ChartType.Grid;
    }

    private static extractColumns(sourceViz: IVisualization): TabularColumn[] | null {
        const columnsByFieldName = new Map<string, TabularColumn>();
        const columns: TabularColumn[] = [];

        const addColumn = (fieldName: string | undefined, isHidden: boolean = false) => {
            if (!fieldName) {
                return;
            }
            const added = columnsByFieldName.get(fieldName);
            if (added) {
                added.isHidden = added.isHidden && isHidden;
                return;
            }
            const column = new TabularColumn(fieldName);
            column.isHidden = isHidden;
            columns.push(column);
            columnsByFieldName.set(fieldName, column);
        };

        const addDimensionColumns = (dims: DimensionColumn[] | undefined) => {
            dims?.forEach(dim => addColumn(dim.dataField?.fieldName));
        };

        const addMeasureColumns = (measures: MeasureColumn[] | undefined) => {
            measures?.forEach(measure => addColumn(measure.dataField?.fieldName, measure.dataField?.isHidden));
        };

        // Category-based visualizations
        if (sourceViz instanceof CategoryVisualizationBase) {
            addColumn(sourceViz.category?.dataField?.fieldName);
            addDimensionColumns(sourceViz.labels);
            addMeasureColumns(sourceViz.values);
        }
        // Financial visualizations (Candlestick, OHLC)
        else if (sourceViz instanceof FinancialVisualizationBase) {
            addDimensionColumns(sourceViz.labels);
            addMeasureColumns(sourceViz.opens);
            addMeasureColumns(sourceViz.highs);
            addMeasureColumns(sourceViz.lows);
            addMeasureColumns(sourceViz.closes);
        }
        // Single gauge visualizations (Text, CircularGauge)
        else if (sourceViz instanceof SingleGaugeVisualizationBase) {
            addColumn(sourceViz.label?.dataField?.fieldName);
            addMeasureColumns(sourceViz.values);
        }
        // Linear gauge visualizations (LinearGauge, BulletGraph)
        else if (sourceViz instanceof LinearGaugeVisualizationBase) {
            addDimensionColumns(sourceViz.labels);
            addMeasureColumns(sourceViz.values);
        }
        // Single value with labels (Pie, Doughnut, Funnel - already handled by CategoryVisualizationBase)
        else if (sourceViz instanceof SingleValueLabelsVisualizationBase) {
            addDimensionColumns(sourceViz.labels);
            addMeasureColumns(sourceViz.values);
        }
        // Handle specific visualization types by instanceof checks
        else if (sourceViz instanceof BubbleVisualization) {
            addDimensionColumns(sourceViz.labels);
            addMeasureColumns(sourceViz.xAxes);
            addMeasureColumns(sourceViz.yAxes);
            addMeasureColumns(sourceViz.radius);
        }
        else if (sourceViz instanceof ScatterVisualization) {
            addDimensionColumns(sourceViz.labels);
            addMeasureColumns(sourceViz.xAxes);
            addMeasureColumns(sourceViz.yAxes);
        }
        else if (sourceViz instanceof ScatterMapVisualization) {
            addColumn(sourceViz.label?.dataField?.fieldName);
            addColumn(sourceViz.latitude?.dataField?.fieldName);
            addColumn(sourceViz.longitude?.dataField?.fieldName);
            addColumn(sourceViz.mapColorCategory?.dataField?.fieldName);
            addMeasureColumns(sourceViz.mapColor);
            addMeasureColumns(sourceViz.bubbleRadius);
        }
        else if (sourceViz instanceof ChoroplethVisualization) {
            addDimensionColumns(sourceViz.locations);
            addMeasureColumns(sourceViz.values);
        }
        else if (sourceViz instanceof SparklineVisualization) {
            addColumn(sourceViz.date?.dataField?.fieldName);
            addDimensionColumns(sourceViz.categories);
            addMeasureColumns(sourceViz.values);
        }
        else if (sourceViz instanceof TreeMapVisualization) {
            addDimensionColumns(sourceViz.labels);
            addMeasureColumns(sourceViz.values);
        }
        else if (sourceViz instanceof PivotVisualization) {
            addDimensionColumns(sourceViz.rows);
            addDimensionColumns(sourceViz.columns);
            addMeasureColumns(sourceViz.values);
        }
        else if (sourceViz instanceof TimeSeriesVisualization) {
            addColumn(sourceViz.date?.dataField?.fieldName);
            addColumn(sourceViz.category?.dataField?.fieldName);
            addMeasureColumns(sourceViz.values);
        }
        else if (sourceViz instanceof KpiTimeVisualization) {
            addColumn(sourceViz.date?.dataField?.fieldName);
            addMeasureColumns(sourceViz.values);
        }
        else if (sourceViz instanceof KpiTargetVisualization) {
            addColumn(sourceViz.date?.dataField?.fieldName);
            addDimensionColumns(sourceViz.categories);
            addMeasureColumns(sourceViz.values);
            addMeasureColumns(sourceViz.targets);
        }

        return columns.length > 0 ? columns : null;
    }

    private static extractAllFields(tabularDataDef: TabularDataDefinition): TabularColumn[] | null {
        const addedFieldNames = new Set<string>();
        const columns: TabularColumn[] = [];

        tabularDataDef.fields.forEach(field => {
            const fieldName = field.fieldName;
            if (fieldName && !addedFieldNames.has(fieldName)) {
                columns.push(new TabularColumn(fieldName));
                addedFieldNames.add(fieldName);
            }
        });

        return columns.length > 0 ? columns : null;
    }
}
