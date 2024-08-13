import { SchemaTypeNames } from "../../Core/Constants/SchemaTypeNames";
import { xmlaDimensionElementConverter } from "../../Core/Serialization/Converters/XmlaDimensionElementConverter";
import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { XmlaDimensionElement, XmlaMeasure } from "../Primitives";
import { DataDefinitionBase } from "./DataDefinitionBase";

export class XmlaDataDefinition extends DataDefinitionBase {
    constructor() {
        super();
        this.schemaTypeName = SchemaTypeNames.XmlaDataSpecType;
    }

    @JsonProperty("ShowGrandTotals")
    showGrandTotals: boolean = false;

    @JsonProperty("Rows", { converter: xmlaDimensionElementConverter })
    rows: XmlaDimensionElement[] = [];

    @JsonProperty("Columns", { converter: xmlaDimensionElementConverter })
    columns: XmlaDimensionElement[] = [];

    @JsonProperty("Measures", { type: XmlaMeasure })
    measures: XmlaMeasure[] = [];

    @JsonProperty("Filters", { converter: xmlaDimensionElementConverter })
    filters: XmlaDimensionElement[] = [];

    @JsonProperty("DataFilters", { converter: xmlaDimensionElementConverter })
    dataFilters: XmlaDimensionElement[] = [];
}