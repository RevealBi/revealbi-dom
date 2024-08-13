import { DashboardDateFilter, DashboardLink, DateLinkFilter, FunnelChartVisualization, LinkFilter, PivotVisualization, RdashDocument, UrlLink, VisualizationLinker } from "@revealbi/dom";
import { DataSourceFactory } from "./DataSourceFactory";

export class DashboardLinkingDashboard {
    static async createDashboard() {
        const excelDataSourceItem = DataSourceFactory.getMarketingDataSourceItem();

        const document = new RdashDocument("Linking Dashboard");
        
        document.filters.push(new DashboardDateFilter());

        const funnel = new FunnelChartVisualization("Funnel Chart", excelDataSourceItem).setLabel("CampaignID").setValue("Conversions");

        const linkedDocument = await RdashDocument.load("Campaigns");
        const filter = linkedDocument.filters.find(f => f.title === "CampaignID");

        const linker = new VisualizationLinker();
        // linker.links = [
        //     new UrlLink("Open URL", "https://www.brianlagunas.com/[CampaignID]"),
        //     new DashboardLink("Open Dashboard", "Campaigns", 
        //         [ 
        //             new LinkFilter("Campaigns Filter", filter.id, filter.title),  
        //             new DateLinkFilter() 
        //         ])
        // ]
        // funnel.linker = linker;

        const pivot = new PivotVisualization("New Seats by Campaign ID", excelDataSourceItem).setRow("CampaignID").setValues("CTR", "Avg. CPC", "New Seats");
        // pivot.linker = new VisualizationLinker()
        //     .addUrl("Open URL", "https://www.brianlagunas.com/[CampaignID]")
        //     .addDashboard("Open Dashboard", "Campaigns", [ new LinkFilter("Campaigns Filter", filter.id, filter.title),  new DateLinkFilter() ]);
        
        document.visualizations = [funnel, pivot];

        return document;
    }
}