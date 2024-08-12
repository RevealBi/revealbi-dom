import { DataSourceItem } from "packages/dom/src/Data";
import { DataSource } from "../../../Data/DataSource";
import { RdashDocument } from "../../../RdashDocument";
import { TabularDataDefinition } from "../../../Visualizations/DataDefinitions/TabularDataDefinition";

export class RdashDocumentValidator {

    static FixDocument(document: RdashDocument): void {
        this.FixDataSources(document);
    }

    private static FixDataSources(document: RdashDocument): void {

        const dataSources: Record<string, DataSource> = {};

        for (const visualization of document.visualizations) {
            if (visualization.dataDefinition instanceof TabularDataDefinition) {
                const tdd = visualization.dataDefinition;

                if (!tdd.dataSourceItem) {
                    throw new Error(`DataSourceItem for visualization ${visualization.title} is null.`);
                }

                //this.fixFields(tdd);
                //this.fixJoinedTables(tdd);
                this.fixDataSources(document, tdd.dataSourceItem, dataSources);
            }

            // TODO: handle XmlaDataDefinition
        }

        this.updateDocumentDataSources(document, dataSources);
    }

    // private static fixFields(tdd: TabularDataDefinition): void {
    //     if (tdd.dataSourceItem?.fields?.length !== 0) {
    //         const fieldNames: Set<string> = new Set(tdd.fields.map(f => f.fieldName));

    //         for (const field of tdd.dataSourceItem.fields.clone()) {
    //             if (!field) {
    //                 throw new Error(`Field for DataSourceItem ${tdd.dataSourceItem.title} is null.`);
    //             }

    //             // Prevent adding duplicate fields
    //             if (!fieldNames.has(field.fieldName)) {
    //                 tdd.fields.push(field);
    //                 fieldNames.add(field.fieldName);
    //             }
    //         }
    //     }

    //     if (!tdd.fields || tdd.fields.length === 0) {
    //         throw new Error(`Fields for DataSourceItem ${tdd.dataSourceItem.title} is null.`);
    //     }
    // }

    // private static fixJoinedTables(tdd: TabularDataDefinition): void {
    //     if (tdd.dataSourceItem?.joinTables) {
    //         tdd.joinTables.push(...tdd.dataSourceItem.joinTables.clone());
    //     }
    // }

    private static fixDataSources(document: RdashDocument, dataSourceItem: DataSourceItem, dataSources: Record<string, DataSource>): void {
        if (dataSourceItem.dataSource) {
            if (!dataSources[dataSourceItem.dataSource.id]) {
                dataSources[dataSourceItem.dataSource.id] = dataSourceItem.dataSource;
            }

            if (dataSourceItem.resourceItemDataSource && !dataSources[dataSourceItem.resourceItemDataSource.id]) {
                dataSources[dataSourceItem.resourceItemDataSource.id] = dataSourceItem.resourceItemDataSource;
            }
        } else {
            this.validateManuallyAddedDataSourceItem(document, dataSourceItem);
        }
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
}