import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { DataProcessingTask } from "./DataProcessingTask";

export class ServiceAdditionalTable
{
    @JsonProperty("Alias")
    alias?: string;
    
    @JsonProperty("DataProcessingTask")
    dataProcessingTask?: DataProcessingTask;
}