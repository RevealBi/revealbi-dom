import { dataSpecConverter } from "../../Core/Serialization/Converters/DataSpecConverter";
import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { DataDefinitionBase } from "../DataDefinitions/DataDefinitionBase";
import { TabularDataDefinition } from "../DataDefinitions/TabularDataDefinition";
import { JoinCondition } from "./JoinCondition";

export class AdditionalTable
{
    @JsonProperty("Alias")
    alias?: string;
    @JsonProperty("DataSpec", { converter: dataSpecConverter })
    dataDefinition?: DataDefinitionBase;
    @JsonProperty("JoinConditions", { type: JoinCondition })
    joinConditions: JoinCondition[] = [];
}