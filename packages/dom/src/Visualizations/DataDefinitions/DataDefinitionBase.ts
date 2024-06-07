import { SchemaType } from "../../Core/SchemaType";
import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { DataSourceItem } from "../../Data/DataSourceItem";
import { DataSpecBindings } from "../Primitives/DataSpecBindings";

export abstract class DataDefinitionBase extends SchemaType {
  
    @JsonProperty("DataSourceItem", { type: DataSourceItem })
    dataSourceItem?: DataSourceItem;
  
    @JsonProperty("Expiration")
    expiration: number = 1440;
  
    @JsonProperty("Bindings", { type: DataSpecBindings })
    bindings?: DataSpecBindings = new DataSpecBindings();
  }