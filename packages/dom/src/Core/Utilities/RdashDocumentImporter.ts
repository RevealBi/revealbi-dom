import { DataSourceItem, DataSource } from "../../Data";
import { BindingBase, DashboardDateFilterBinding, DashboardDataFilterBinding } from "../../Filters";
import { ImportOptions } from "../../Primitives/Interfaces";
import { RdashDocument } from "../../RdashDocument";
import { IVisualization } from "../../Visualizations";
import { Guid } from "../Guid";
import { CloneUtility } from "./CloneUtility";

export class RdashDocumentImporter {

    static import(targetDocument: RdashDocument, sourceDocument: RdashDocument, visualization?: string | IVisualization, options?: ImportOptions): void {
        if (!visualization) {
            sourceDocument.visualizations.forEach(viz => this.importVisualization(targetDocument, sourceDocument, viz, options));
            return;
        }

        const viz = typeof visualization === "string" ? sourceDocument.visualizations.find(v => v.id === visualization) : visualization;
        if (!viz) {
            console.warn("RdashImporter: Visualization not found in the document.");
            return;
        }

        this.importVisualization(targetDocument, sourceDocument, viz, options);
    }

    private static importVisualization(targetDocument: RdashDocument, sourceDocument: RdashDocument, viz: IVisualization, options?: ImportOptions): void {
        const clonedViz = CloneUtility.clone(viz);
        clonedViz.id = Guid.newGuid();

        if (clonedViz.dataDefinition.dataSourceItem) {
            this.processDataSourceItem(targetDocument, sourceDocument, clonedViz.dataDefinition.dataSourceItem);
        }

        if (options?.includeDashboardFilters) {
            this.processDashboardFilters(targetDocument, sourceDocument, clonedViz);
        } else {
            clonedViz.filterBindings = undefined;
        }

        if (!options?.includeVisualizationFilters) {
            clonedViz.filters = [];
        }

        targetDocument.visualizations.push(clonedViz);
    }

    private static processDataSourceItem(targetDocument: RdashDocument, sourceDocument: RdashDocument, dataSourceItem: DataSourceItem): void {
        const dataSource = this.findAndCloneDataSource(targetDocument, sourceDocument, dataSourceItem.dataSourceId);
        if (dataSource) {
            targetDocument.dataSources.push(dataSource);

            if (dataSourceItem.resourceItem) {
                const resourceDataSource = this.findAndCloneDataSource(targetDocument, sourceDocument, dataSourceItem.resourceItem.dataSourceId);
                if (resourceDataSource) {
                    targetDocument.dataSources.push(resourceDataSource);
                }
            }
        }
    }

    private static findAndCloneDataSource(targetDocument: RdashDocument, sourceDocument: RdashDocument, dataSourceId: string | undefined): DataSource | undefined {
        if (!dataSourceId || targetDocument.dataSources.some(ds => ds.id === dataSourceId)) {
            return undefined; // dataSource already exists in the target document
        }
        const dataSource = sourceDocument.dataSources.find(ds => ds.id === dataSourceId);
        return dataSource ? CloneUtility.clone(dataSource) : undefined;
    }

    private static processDashboardFilters(targetDocument: RdashDocument, sourceDocument: RdashDocument, clonedViz: IVisualization): void {
        clonedViz.filterBindings?.forEach(fb => {
            const filterId = this.getFilterId(fb);
            if (filterId && !targetDocument.filters.some(f => f.id === filterId)) {
                const filter = sourceDocument.filters.find(f => f.id === filterId);
                if (filter) {
                    targetDocument.filters.push(CloneUtility.clone(filter));
                }
            }
        });
    }

    private static getFilterId(fb: BindingBase): string | undefined {
        if (fb instanceof DashboardDateFilterBinding) {
            return "_date";
        } else if (fb instanceof DashboardDataFilterBinding) {
            return fb.target?.dashboardFilterId;
        }
        return undefined;
    }
}