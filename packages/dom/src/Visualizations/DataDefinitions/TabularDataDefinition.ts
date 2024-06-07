import { SchemaTypeNames } from "../../Core/Constants/SchemaTypeNames";
import { fieldsConverter } from "../../Core/Serialization/Converters/FieldsConverter";
import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { VisualizationFilter } from "../../Filters/VisualizationFilter";
import { IField } from "../Interfaces/IField";
import { AdditionalTable } from "../Primitives/AdditionalTable";
import { ServiceAdditionalTable } from "../Primitives/ServiceAdditionalTable";
import { SummarizationSpec } from "../Primitives/SummarizationSpec";
import { DataDefinitionBase } from "./DataDefinitionBase";

export class TabularDataDefinition extends DataDefinitionBase {
    
    constructor() {
        super();
        this.schemaTypeName = SchemaTypeNames.TabularDataSpecType;
    }

    @JsonProperty("IsTransposed")
    isTransposed: boolean = false;

    @JsonProperty("Fields", { converter: fieldsConverter })
    fields: IField[] = [];

    @JsonProperty("TransposedFields", { converter: fieldsConverter })
    transposedFields: IField[] = [];
    
    @JsonProperty("QuickFilters", { type: VisualizationFilter })
    quickFilters: VisualizationFilter[] = [];
    
    @JsonProperty("SummarizationSpec")
    summarizationSpec?: SummarizationSpec;

    @JsonProperty("AdditionalTables", { type: AdditionalTable })
    additionalTables: AdditionalTable[] = [];

    @JsonProperty("ServiceAdditionalTables")
    serviceAdditionalTables: ServiceAdditionalTable[] = [];
}