import { JsonConvert } from "../Core";
import { Guid } from "../Core/Guid";
import { dataSpecConverter } from "../Core/Serialization/Converters/DataSpecConverter";
import { JsonProperty } from "../Core/Serialization/Decorators/JsonProperty";
import { DataSourceItem } from "../Data";
import { TabularDataDefinition } from "./DataDefinitions/TabularDataDefinition";
import { XmlaDataDefinition } from "./DataDefinitions/XmlaDataDefinition";
import { ChartType } from "./Enums";
import { IDataDefinition } from "./Interfaces/IDataDefinition";
import { IVisualization } from "./Interfaces/IVisualization";
import { IField } from "./Interfaces/IField";
import { FieldBase } from "./Primitives";
import { CloneUtility } from "../Core/Utilities/CloneUtility";


export abstract class VisualizationBase implements IVisualization {

    constructor(title: string, dataSourceItem: DataSourceItem | null) {
        this.title = title;
        this.initializeDataDefinition(dataSourceItem);
    }

    @JsonProperty("Id")
    id: string = Guid.newGuid();

    @JsonProperty("Title")
    title?: string;

    @JsonProperty("Description")
    description?: string;

    @JsonProperty("DataSpec", { converter: dataSpecConverter })
    dataDefinition!: IDataDefinition;

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

    protected initializeDataDefinition(dataSourceItem: DataSourceItem | null) {
        if (dataSourceItem != null) {
            if (dataSourceItem.hasTabularData) {
                this.dataDefinition = new TabularDataDefinition();
            }
            else {
                this.dataDefinition = new XmlaDataDefinition();
            }

            this.updateDataSourceItem(dataSourceItem);
        }
    }

    private updateDataSourceItem(dataSourceItem: DataSourceItem) {
        if (this.dataDefinition == null || dataSourceItem == null)
            return;

        this.dataDefinition.dataSourceItem = dataSourceItem;
        if (this.dataDefinition instanceof TabularDataDefinition) {
            this.dataDefinition.fields = dataSourceItem.fields.map(field => CloneUtility.clone(field));
        }
    }

    setPosition(rowSpan: number, columnSpan: number): this {
        this.rowSpan = rowSpan;
        this.columnSpan = columnSpan;
        return this;
    }
}
