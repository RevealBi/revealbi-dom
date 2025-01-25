import { DataSource } from "../../../Data/DataSource";
import { DataSourceItem } from "../../../Data/DataSourceItem";
import { RdashDocument } from "../../../RdashDocument";
import { TabularDataDefinition } from "../../../Visualizations/DataDefinitions/TabularDataDefinition";
import { DashboardDateFilter } from "../../../Filters/DashboardDateFilter";

export class RdashDocumentValidator {

    static validate(document: RdashDocument): void {
        this.fixVisualizations(document);
        this.reorderDashboardFilters(document);
    }

    private static fixVisualizations(document: RdashDocument): void {
        const dataSources: Record<string, DataSource> = {};

        for (const visualization of document.visualizations) {
            if (visualization.dataDefinition instanceof TabularDataDefinition) {
                const tdd = visualization.dataDefinition;

                if (!tdd.dataSourceItem) {
                    throw new Error(`DataSourceItem for visualization ${visualization.title} is null.`);
                }

                this.fixFields(tdd);
                this.fixDataSources(document, tdd.dataSourceItem, dataSources);
            }
            // TODO: handle XmlaDataDefinition
        }

        this.updateDocumentDataSources(document, dataSources);
    }

    private static fixFields(tdd: TabularDataDefinition): void {    
        if (!tdd.fields || tdd.fields.length === 0) {
            throw new Error(`Fields for DataSourceItem ${tdd.dataSourceItem?.title} is null.`);
        }

        //todo: remove duplicate fields
    }

    private static fixDataSources(document: RdashDocument, dataSourceItem: DataSourceItem, dataSources: Record<string, DataSource>): void {
        const handleDataSource = (dataSource: DataSource | null | undefined) => {
            if (!dataSource) return;
    
            if (dataSource instanceof DataSource && !dataSources[dataSource.id]) {
                dataSources[dataSource.id] = dataSource;
            } else if (typeof dataSource === 'object') {
                const newDataSource = new DataSource();
                Object.assign(newDataSource, dataSource);
                newDataSource.properties = { ...(dataSource as DataSource).properties };
                dataSources[newDataSource.id] = newDataSource;
            }
        };
    
        handleDataSource(dataSourceItem.dataSource);
    
        if (!dataSourceItem.dataSource) {
            this.validateManuallyAddedDataSourceItem(document, dataSourceItem);
        }
    
        handleDataSource(dataSourceItem.resourceItemDataSource);
    }

    private static validateManuallyAddedDataSourceItem(document: RdashDocument, dsi: DataSourceItem): void {
        const ds = document.dataSources?.find(x => x.id === dsi.dataSourceId);
        if (!ds) {
            throw new Error(`Data source with id ${dsi.dataSourceId} not found in the RdashDocument.dataSources collection.`);
        }

        if (dsi.resourceItem) {
            const rds = document.dataSources?.find(x => x.id === dsi.resourceItem?.dataSourceId);
            if (!rds) {
                throw new Error(`ResourceItem with Data source id ${dsi.resourceItem.dataSourceId} not found in the RdashDocument.dataSources collection.`);
            }
        }
    }

    private static updateDocumentDataSources(document: RdashDocument, dataSources: Record<string, DataSource>): void {
        const allDataSources = document.dataSources ? [...document.dataSources, ...Object.values(dataSources)] : Object.values(dataSources);
        document.dataSources = allDataSources;
    }

    private static reorderDashboardFilters(document: RdashDocument): void {
        // Make sure the DashboardDateFilter is the first item in the collection
        const dashboardDateFilter = document.filters.find(f => f instanceof DashboardDateFilter);
        if (dashboardDateFilter) {
            const index = document.filters.indexOf(dashboardDateFilter);
            if (index > -1) {
                document.filters.splice(index, 1); // Remove the filter
                document.filters.unshift(dashboardDateFilter); // Add it to the beginning
            }
        }
    }
}