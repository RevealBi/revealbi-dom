import { DataSource } from "../../../Data/DataSource";
import { RdashDocument } from "../../../RdashDocument";
import { DataDefinitionBase } from "../../../Visualizations/DataDefinitions/DataDefinitionBase";
import { IVisualization } from "../../../Visualizations/Interfaces/IVisualization";
import { VisualizationSettings } from "../../../Visualizations/Settings/VisualizationSettings";
import { Visualization } from "../../../Visualizations/Visualization";

export class RdashDocumentValidator {

    static FixDocument(document: RdashDocument): void {
        this.FixDataSources(document);
    }

    private static FixDataSources(document: RdashDocument): void {

        const dataSources: { [key: string]: DataSource } = {};

        for (const visualization of document.visualizations) {
            if (RdashDocumentValidator.hasDataDefinition(visualization)) {
                const dsi = visualization.dataDefinition.dataSourceItem;
                if (dsi) {
                    if (dsi.dataSource instanceof DataSource && !dataSources[dsi.dataSource.id]) {
                        dataSources[dsi.dataSource.id] = dsi.dataSource;
                    } else if (typeof dsi.dataSource === 'object') {
                        const newDataSource = new DataSource();
                        Object.assign(newDataSource, dsi.dataSource);
                        newDataSource.properties = { ...dsi.dataSource.properties }; // Perform a deep copy of the properties
                        dataSources[newDataSource.id] = newDataSource;
                    }

                    if (dsi.resourceItemDataSource instanceof DataSource && !dataSources[dsi.resourceItemDataSource.id]) {
                        dataSources[dsi.resourceItemDataSource.id] = dsi.resourceItemDataSource;
                    } else if(typeof dsi.resourceItemDataSource === 'object') {
                        const newDataSource = new DataSource();
                        Object.assign(newDataSource, dsi.resourceItemDataSource);
                        newDataSource.properties = { ...dsi.resourceItemDataSource.properties }; // Perform a deep copy of the properties
                        dataSources[newDataSource.id] = newDataSource;
                    }
                }
            }
        }

        const allDataSources = document.dataSources?.concat(Object.values(dataSources));
        document.dataSources = allDataSources?.slice();
    }

    private static hasDataDefinition(visualization: IVisualization): visualization is Visualization<VisualizationSettings, DataDefinitionBase> {
        return visualization instanceof Visualization && "dataDefinition" in visualization;
    }
}