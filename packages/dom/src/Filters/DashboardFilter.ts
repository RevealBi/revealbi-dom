import { Guid } from "../Core/Guid";
import { SchemaType } from "../Core/SchemaType";
import { JsonProperty } from "../Core/Serialization/Decorators/JsonProperty";

export class DashboardFilter extends SchemaType {
    @JsonProperty("Id")
    id: string = Guid.newGuid();

    @JsonProperty("Title")
    title: string = "";

    @JsonProperty("CrossFilteringSourceWidgetId") //todo: figure this out
    crossFilteringSourceWidgetId?: string;
}