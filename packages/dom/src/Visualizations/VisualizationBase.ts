import { Guid } from "../Core/Guid";
import { JsonProperty } from "../Core/Serialization/Decorators/JsonProperty";
import { ChartType } from "./Enums";
import { IVisualization } from "./Interfaces/IVisualization";


export abstract class VisualizationBase implements IVisualization {

    constructor(title?: string) {
        this.title = title;
    }

    @JsonProperty("Id")
    id: string = Guid.newGuid();

    @JsonProperty("Title")
    title?: string;

    @JsonProperty("IsTitleVisible")
    isTitleVisible: boolean = true;

    @JsonProperty("ColumnSpan")
    columnSpan: number = 10;

    @JsonProperty("RowSpan")
    rowSpan: number = 20;

    private _chartType: ChartType = ChartType.Unknown;
    public get chartType(): ChartType {
        return this._chartType;
    }
    protected set chartType(value: ChartType) {
        this._chartType = value;
    }
}
