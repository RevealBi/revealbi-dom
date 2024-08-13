import { DataDefinitionBase } from "../DataDefinitions/DataDefinitionBase";
import { ChartType } from "../Enums";
import { VisualizationSettings } from "../Settings/VisualizationSettings";
import { IDataDefinition } from "./IDataDefinition";

export interface IVisualization {
    id: string;
    get chartType(): ChartType;
    title?: string;
    isTitleVisible: boolean;
    columnSpan: number;
    rowSpan: number;
    get dataDefinition(): IDataDefinition;
}

export interface IVisualizationBase<TSettings extends VisualizationSettings, TDataSpec extends DataDefinitionBase>
  extends IVisualization {
  dataDefinition: TDataSpec;
  settings: TSettings;
}