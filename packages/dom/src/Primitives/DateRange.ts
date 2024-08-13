import { SchemaType } from "../Core/SchemaType";
import { JsonProperty } from "../Core/Serialization/Decorators/JsonProperty";

// todo: this class is only needed becuase of the way we decided to store a date in the schema
//maybe we can find a better way to do this
export class CustomDate extends SchemaType {
    constructor() {
        super();
        this.schemaTypeName = "date";
    }

    @JsonProperty("value", { type: Date })
    value?: Date;
}

export class DateRange
{
    @JsonProperty("From", { type: CustomDate })
    from?: CustomDate;

    @JsonProperty("To", { type: CustomDate })
    to?: CustomDate;
}

