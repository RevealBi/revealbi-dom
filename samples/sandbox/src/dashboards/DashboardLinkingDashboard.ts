import { DashboardDateFilter, DateFilterRule, PeriodType, DashboardLink, DateLinkFilter, FunnelChartVisualization, LinkFilter, PivotVisualization, RdashDocument, UrlLink, VisualizationLinker } from "@revealbi/dom";
import { DataSourceFactory } from "./DataSourceFactory";

export class DashboardLinkingDashboard {
    static async createDashboard() {
        const excelDataSourceItem = DataSourceFactory.getMarketingDataSourceItem();

        const document = new RdashDocument("Linking Dashboard");
        
        const sourceDate = new DashboardDateFilter(DateFilterRule.last(1, PeriodType.Year));
        document.filters.push(sourceDate);

        const funnel = new FunnelChartVisualization("Funnel Chart", excelDataSourceItem).setLabel("CampaignID").setValue("Conversions");

        const linkedDocument = await RdashDocument.load("Campaigns");
        const filter = linkedDocument.filters.find(f => f.title === "CampaignID");
        if (!filter) throw new Error("Filter not found");
        const targetDate = linkedDocument.filters.find((f): f is DashboardDateFilter => f instanceof DashboardDateFilter);
        if (!targetDate) throw new Error("Target date filter not found");

        const linker = new VisualizationLinker();
        linker.links = [
            new UrlLink("Open URL", "https://www.brianlagunas.com/[CampaignID]"),
            new DashboardLink("Open Dashboard", "Campaigns", 
                [ 
                    new LinkFilter("Campaigns Filter", filter.id, filter.title),  
                    new DateLinkFilter(sourceDate, targetDate)
                ])
        ]
        funnel.linker = linker;

        const pivot = new PivotVisualization("New Seats by Campaign ID", excelDataSourceItem).setRow("CampaignID").setValues("CTR", "Avg. CPC", "New Seats");
        pivot.linker = new VisualizationLinker()
            .addUrl("Open URL", "https://www.brianlagunas.com/[CampaignID]")
            .addDashboard("Open Dashboard", "Campaigns", [ new LinkFilter("Campaigns Filter", filter.id, filter.title),  new DateLinkFilter(sourceDate, targetDate)]);
        
        document.visualizations = [funnel, pivot];

        return document;
    }
}