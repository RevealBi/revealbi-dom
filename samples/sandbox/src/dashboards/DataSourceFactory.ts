import { DataSource, DataSourceItem, DateField, IField, NumberField, RestDataSourceItem, TextField } from "@revealbi/dom";

export class DataSourceFactory {

    static _excelUri = "http://dl.infragistics.com/reportplus/reveal/samples/Samples.xlsx";

    static getMarketingDataSourceItem(): DataSourceItem {
        const dataSource = new DataSource();
        dataSource.title = "Excel Data Source";
        dataSource.subtitle = "The Data Source for Excel via REST";

        const excelDataSourceItem = new RestDataSourceItem("Marketing", dataSource);
        excelDataSourceItem.subtitle = "Excel Data Source Item";
        excelDataSourceItem.isAnonymous = true;
        excelDataSourceItem.uri = this._excelUri;
        excelDataSourceItem.fields = this.getMarketingDataSourceFields();
        excelDataSourceItem.useExcel("Marketing");

        return excelDataSourceItem;
    }

    // static getHealthcareDataSourceItem(): DataSourceItem {
    //     const excelDataSourceItem = new RestServiceBuilder("http://dl.infragistics.com/reportplus/reveal/samples/Samples.xlsx")
    //         .setTitle("Excel Data Source")
    //         .setSubtitle("Healthcare Sheet")
    //         .useExcel("Healthcare")
    //         .setFields(this.getHealthcareDataSourceFields())
    //         .build();

    //     return excelDataSourceItem;
    // }

    // static getManufacturingDataSourceItem(): DataSourceItem {
    //     const excelDataSourceItem = new RestServiceBuilder("http://dl.infragistics.com/reportplus/reveal/samples/Samples.xlsx")
    //         .setTitle("Excel Data Source")
    //         .setSubtitle("Manufacturing Sheet")
    //         .useExcel("Manufacturing")
    //         .setFields(this.getManufacturingDataSourceFields())
    //         .build();

    //     return excelDataSourceItem;
    // }

    static getSalesDataSourceItem(): DataSourceItem {
        const dataSource = new DataSource();
        dataSource.title = "Excel Data Source";
        dataSource.subtitle = "The Data Source for Excel via REST";

        const excelDataSourceItem = new RestDataSourceItem("Sales", dataSource);
        excelDataSourceItem.subtitle = "Sales Sheet";
        excelDataSourceItem.isAnonymous = true;
        excelDataSourceItem.uri = this._excelUri;
        excelDataSourceItem.fields = this.getSalesDataSourceFields();
        excelDataSourceItem.useExcel("Sales");

        return excelDataSourceItem;
    }

    static getRevenueDataSourceFields(): IField[] {
        return [
            new DateField("Date"),
            new TextField("State"),
            new NumberField("Revenue"),
            new NumberField("RevenueBudget"),
            new NumberField("RevenueBudgetLY"),
            new NumberField("GM"),
            new NumberField("GrossMarginLY"),
            new NumberField("GM%"),
            new NumberField("GrossMargin%LY"),
            new NumberField("RevenueperCompany"),
            new TextField("Company"),
            new TextField("Division")
        ];
    }

    static getHealthcareDataSourceFields(): IField[] {
        return [
            new DateField("Date"),
            new NumberField("Number of Inpatients"),
            new NumberField("Number of Outpatients"),
            new NumberField("Treatment Costs "),
            new NumberField("ER Wait Time"),
            new TextField("Divison"),
            new TextField("Satisfaction"),
            new NumberField("Length of Stay "),
            new NumberField("Charges per MD"),
            new NumberField("Current Paitents")
        ];
    }

    static getManufacturingDataSourceFields(): IField[] {
        return [
            new DateField("Date"),
            new NumberField("Units Lost"),
            new NumberField("Overall Plant Productivity "),
            new NumberField("Operators Available "),
            new TextField("Operators by Function"),
            new NumberField("Units Produced"),
            new TextField("Product"),
            new NumberField("Efficiency"),
            new TextField("Line"),
            new NumberField("Orders In"),
            new NumberField("Orders Shipped "),
            new NumberField("Cost of Labor "),
            new NumberField("Revenue")
        ];
    }

    static getMarketingDataSourceFields(): IField[] {
        return [
            new DateField("Date"),
            new NumberField("Spend"),
            new NumberField("Budget"),
            new NumberField("CTR"),
            new NumberField("Avg. CPC"),
            new NumberField("Traffic"),
            new NumberField("Paid Traffic"),
            new NumberField("Other Traffic"),
            new NumberField("Conversions"),
            new TextField("Territory"),
            new TextField("CampaignID"),
            new NumberField("New Seats"),
            new NumberField("Paid %"),
            new NumberField("Organic %")
        ];
    }

    static getSalesDataSourceFields(): IField[] {
        return [
            new TextField("Territory"),
            new DateField("Date"),
            new NumberField("Quota"),
            new NumberField("Leads"),
            new NumberField("Hot Leads"),
            new NumberField("New Seats"),
            new NumberField("New Sales"),
            new NumberField("Renewal Seats"),
            new NumberField("Renewal Sales "),
            new TextField("Employee"),
            new NumberField("Pipepline"),
            new NumberField("Forecasted"),
            new NumberField("Revenue"),
            new NumberField("Total Opportunites"),
            new TextField("Product")
        ];
    }

    static getSalesByCategoryFields(): IField[] {
        return [
            new NumberField("CategoryID"),
            new TextField("CategoryName"),
            new TextField("ProductName"),
            new NumberField("ProductSales"),
        ];
    }

    static getCsvDataSourceFields(): IField[] {
        return [
            new TextField("the_geom"),
            new NumberField("School_ID"),
            new TextField("School_Nm"),
            new TextField("Sch_Addr"),
            new TextField("Grade_Cat"),
            new TextField("Grades"),
            new TextField("Sch_Type"),
            new NumberField("X"),
            new NumberField("Y"),
        ];
    }

    static getOHLCDataSourceFields(): IField[] {
        return [
            new DateField("Date"),
            new NumberField("Open"),
            new NumberField("High"),
            new NumberField("Low"),
            new NumberField("Close"),
            new NumberField("Volume"),
        ];
    }

}