import { Guid } from "../Core/Guid";
import { dataSpecConverter } from "../Core/Serialization/Converters/DataSpecConverter";
import { JsonProperty } from "../Core/Serialization/Decorators/JsonProperty";
import { DataSourceItem } from "../Data";
import { TabularDataDefinition } from "./DataDefinitions/TabularDataDefinition";
import { XmlaDataDefinition } from "./DataDefinitions/XmlaDataDefinition";
import { ChartType } from "./Enums";
import { IDataDefinition } from "./Interfaces/IDataDefinition";
import { IVisualization } from "./Interfaces/IVisualization";
import { FieldBase } from "./Primitives";
import { CloneUtility } from "../Core/Utilities/CloneUtility";
import { IFilter, DashboardDateFilter, DashboardDataFilter, DashboardDateFilterBinding, DashboardDataFilterBinding, BindingBase } from "../Filters";


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

    get filterBindings(): BindingBase[] | undefined {
        return this.dataDefinition?.bindings?.bindings;
    }
    set filterBindings(value: BindingBase[]) {
        if (this.dataDefinition.bindings) {
            this.dataDefinition.bindings.bindings = value;
        }
    }

    //todo: is it possible to create a Filters property that can properly handle both Tabular and Xmla data specs?
    // get filters(): VisualizationFilter[] {
    //     return this.dataDefinition.quickFilters;
    // }

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

    addDataFilter(fieldName: string, filter: IFilter): this {
        if (this.dataDefinition instanceof TabularDataDefinition) {
            const field = this.dataDefinition.fields.find(x => x.fieldName === fieldName);
            if (field) {               
                const filterField = field as FieldBase<IFilter>;
                filterField.dataFilter = filter;
            }
        }
        return this;
    }

    connectDashboardFilter(dashboardFilter: DashboardDateFilter | DashboardDataFilter, fieldName?: string): this {
        if (dashboardFilter instanceof DashboardDateFilter) {
            this.filterBindings?.push(new DashboardDateFilterBinding(fieldName ?? "Date"))
        } else {
            const binding = fieldName ? new DashboardDataFilterBinding(dashboardFilter, fieldName) : new DashboardDataFilterBinding(dashboardFilter);
            this.filterBindings?.push(binding)
        }
        return this;
    }

    connectDashboardFilters(...dashboardFilters: (DashboardDateFilter | DashboardDataFilter)[]): this {
        dashboardFilters.forEach(filter => this.connectDashboardFilter(filter));
        return this;
    }
}
