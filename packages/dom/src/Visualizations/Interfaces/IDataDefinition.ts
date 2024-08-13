import { DataSourceItem } from "../../Data";
import { DataSpecBindings } from "../Primitives";

export interface IDataDefinition {
    bindings?: DataSpecBindings;
    cacheExpiration: number;
    dataSourceItem?: DataSourceItem;
}