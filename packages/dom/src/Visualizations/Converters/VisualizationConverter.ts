import { IVisualization } from "../Interfaces/IVisualization";
import { ChartType } from "../Enums";
import { TabularColumn } from "../Primitives/TabularColumn";
import { CategoryVisualizationBase } from "../CategoryVisualizationBase";
import { GridVisualization } from "../GridVisualization";
import { TabularDataDefinition } from "../DataDefinitions/TabularDataDefinition";

export class VisualizationConverter {
    
    static toGrid(sourceViz: IVisualization): GridVisualization | null {
        if (!VisualizationConverter.canConvertToGrid(sourceViz.chartType)) {
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

        const columns = VisualizationConverter.extractColumns(sourceViz);
        if (!columns || columns.length === 0) {
            return null;
        }

        const gridViz = new GridVisualization(
            sourceViz.title || 'Grid',
            tabularDataDef.dataSourceItem
        );

        gridViz.columns = columns;
        gridViz.id = sourceViz.id;
        gridViz.backgroundColor = sourceViz.backgroundColor;
        gridViz.isTitleVisible = sourceViz.isTitleVisible;
        gridViz.columnSpan = sourceViz.columnSpan;
        gridViz.rowSpan = sourceViz.rowSpan;

        if (sourceViz.filters && sourceViz.filters.length > 0) {
            gridViz.filters = sourceViz.filters;
        }

        if (sourceViz.filterBindings && sourceViz.filterBindings.length > 0) {
            gridViz.filterBindings = sourceViz.filterBindings;
        }

        return gridViz;
    }

    private static canConvertToGrid(chartType: ChartType): boolean {
        return chartType !== ChartType.TextBox && 
               chartType !== ChartType.Custom && 
               chartType !== ChartType.Grid;
    }

    private static extractColumns(sourceViz: IVisualization): TabularColumn[] | null {
        const categoryViz = sourceViz as CategoryVisualizationBase<any>;
        const addedFieldNames = new Set<string>();
        const columns: TabularColumn[] = [];

        const addColumn = (fieldName: string | undefined) => {
            if (fieldName && !addedFieldNames.has(fieldName)) {
                columns.push(new TabularColumn(fieldName));
                addedFieldNames.add(fieldName);
            }
        };

        addColumn(categoryViz.category?.dataField?.fieldName);
        categoryViz.labels?.forEach(label => addColumn(label.dataField?.fieldName));
        categoryViz.values?.forEach(value => addColumn(value.dataField?.fieldName));

        return columns.length > 0 ? columns : null;
    }
}
