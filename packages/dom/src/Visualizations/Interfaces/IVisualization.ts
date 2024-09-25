import { BindingBase } from "../../Filters";
import { ChartType } from "../Enums";
import { IDataDefinition } from "./IDataDefinition";

export interface IVisualization {
    id: string;
    get chartType(): ChartType;
    title?: string;
    isTitleVisible: boolean;
    columnSpan: number;
    rowSpan: number;
    get dataDefinition(): IDataDefinition;
    filterBindings?: BindingBase[];
}