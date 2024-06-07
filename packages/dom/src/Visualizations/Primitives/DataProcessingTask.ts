import { DataProcessingInputField } from "./DataProcessingInputField";
import { DataProcessingOutputField } from "./DataProcessingOutputField";

//todo: implement
export class DataProcessingTask
{
    InputFields: DataProcessingInputField[] = [];
    OutputFields: DataProcessingOutputField[] = [];
    Parameters: Record<string, any> = {};
}