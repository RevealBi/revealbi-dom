import { JsonProperty } from "../Core/Serialization/Decorators/JsonProperty";

export class DateRange
{
    @JsonProperty("From", { type: Date })
    from?: Date;

    @JsonProperty("To", { type: Date })
    to?: Date;
}