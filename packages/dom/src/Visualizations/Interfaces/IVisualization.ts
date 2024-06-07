import { DataDefinitionBase } from "../DataDefinitions/DataDefinitionBase";
import { ChartType } from "../Enums";
import { VisualizationSettings } from "../Settings/VisualizationSettings";

export interface IVisualization {
    id: string;
    chartType: ChartType;
    title?: string;
    isTitleVisible: boolean;
    columnSpan: number;
    rowSpan: number;
}

export interface IVisualizationBase<TSettings extends VisualizationSettings, TDataSpec extends DataDefinitionBase>
  extends IVisualization {
  dataDefinition: TDataSpec;
  settings: TSettings;
}