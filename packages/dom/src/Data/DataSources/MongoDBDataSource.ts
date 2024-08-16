import { DataSourceProvider } from "../../Core/Constants/DataSourceProvider";
import { DatabaseDataSource } from "../DatabaseDataSource";

export class MongoDBDataSource extends DatabaseDataSource {
    constructor() {
        super();
        this.provider = DataSourceProvider.MongoDB;
    }

    get connectionString(): string {
        return this.properties["ConnectionString"];
    }

    set connectionString(value: string) {
        this.properties["ConnectionString"] = value;
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
