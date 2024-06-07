import { SchemaTypeNames } from "../../Core/Constants/SchemaTypeNames";
import { dataFieldConverter } from "../../Core/Serialization/Converters/DataFieldConverter";
import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import type { IDimensionDataField } from "../Interfaces";
import { ColumnBase } from "./ColumnBase";
import { XmlaDimensionElement } from "./XmlaDimensionElement";

export class DimensionColumn extends ColumnBase {

    constructor() 
    constructor(dataField: IDimensionDataField)
    constructor(dataField?: IDimensionDataField){
        super();
        this.schemaTypeName = SchemaTypeNames.DimensionColumnSpecType;

        if (dataField){
            this.dataField = dataField;
        }
    }

    /**
     * Gets or sets the DataField. Choose from the DateDataField or the TextDataField.
     */
    @JsonProperty("SummarizationField", { converter: dataFieldConverter })
    dataField?: IDimensionDataField;

    @JsonProperty("XmlaElement", { type: XmlaDimensionElement })
    private xmlaElement?: XmlaDimensionElement;
}