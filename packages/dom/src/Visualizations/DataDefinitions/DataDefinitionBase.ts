import { SchemaType } from "../../Core/SchemaType";
import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { DataSourceItem } from "../../Data/DataSourceItem";
import { IDataDefinition } from "../Interfaces/IDataDefinition";
import { DataSpecBindings } from "../Primitives/DataSpecBindings";

export abstract class DataDefinitionBase extends SchemaType implements IDataDefinition {
  
    @JsonProperty("DataSourceItem", { type: DataSourceItem })
    dataSourceItem?: DataSourceItem;
  
    @JsonProperty("Expiration")
    cacheExpiration: number = 1440;
  
    @JsonProperty("Bindings", { type: DataSpecBindings })
    bindings?: DataSpecBindings = new DataSpecBindings();
  }