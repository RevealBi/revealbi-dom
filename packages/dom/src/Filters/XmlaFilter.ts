import { filterConverter } from "../Core/Serialization/Converters/FilterConverter";
import { JsonProperty } from "../Core/Serialization/Decorators/JsonProperty";
import { DataType } from "../Enums/DataType";
import { XmlaElementType } from "./Enums/XmlaElementType";
import type { IFilter } from "./Interfaces/IFilter";

export class XmlaFilter
{
    @JsonProperty("Filter", { converter: filterConverter})
    filter?: IFilter;
    
    @JsonProperty("UniqueName")
    uniqueName?: string;
    
    @JsonProperty("DataType")
    dataType: DataType = DataType.String;

    @JsonProperty("IsDynamic")
    isDynamic: boolean = false;
    
    @JsonProperty("ElementType")
    elementType: XmlaElementType = XmlaElementType.Dimension;
}