import { SchemaType } from "../Core/SchemaType";
import { JsonProperty } from "../Core/Serialization/Decorators/JsonProperty";

// todo: this class is only needed becuase of the way we decided to store a date in the schema
// maybe we can find a better way to do this
// don't export this because it's an ugly API. keep it for internal use only
class CustomDate extends SchemaType {
    constructor(value?: string) {
        super();
        this.schemaTypeName = "date";
        this.value = value;
    }

    @JsonProperty("value")
    value?: string;
}

export class DateRange
{
    constructor(from?: Date, to?: Date) {
        if (from) this.from = new CustomDate(from.toISOString());
        if (to) this.to = new CustomDate(to.toISOString());
    }
    
    @JsonProperty("From", { type: CustomDate })
    from?: CustomDate;

    @JsonProperty("To", { type: CustomDate })
    to?: CustomDate;
}

