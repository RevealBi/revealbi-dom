import { HostDataSource } from "./HostDataSource";

export abstract class ProcessDataSource extends HostDataSource {

    constructor()
    constructor(title: string)
    constructor(title: string, subtitle: string)
    constructor(title: string = "", subtitle: string = "") {
        super(title, subtitle);
        this.processDataOnServerDefaultValue = true;
        this.processDataOnServerReadOnly = false;
    }

    get processDataOnServerDefaultValue(): boolean {
        return this.properties["ServerAggregationDefault"];
    }
    set processDataOnServerDefaultValue(value: boolean) {
        this.properties["ServerAggregationDefault"] = value;
    }

    get processDataOnServerReadOnly(): boolean {
        return this.properties["ServerAggregationReadOnly"];
    }
    set processDataOnServerReadOnly(value: boolean) {
        this.properties["ServerAggregationReadOnly"] = value;
    }
}
