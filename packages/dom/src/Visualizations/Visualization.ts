import { settingConverter } from "../Core/Serialization/Converters/SettingsConverter";
import { JsonProperty } from "../Core/Serialization/Decorators/JsonProperty";
import { DataSourceItem } from "../Data";
import { DashboardDataFilter, DashboardDataFilterBinding, DashboardDateFilter, DashboardDateFilterBinding, IFilter } from "../Filters";
import { TabularDataDefinition } from "./DataDefinitions/TabularDataDefinition";
import { IFilterBindings } from "./Interfaces/IFilterBindings";
import { FieldBase } from "./Primitives";
import { VisualizationLinker } from "./Primitives/VisualizationLinker";
import { VisualizationSettings } from "./Settings/VisualizationSettings";
import { VisualizationBase } from "./VisualizationBase";

export abstract class Visualization<TSettings extends VisualizationSettings> extends VisualizationBase implements IFilterBindings {

    constructor(title: string, dataSourceItem: DataSourceItem | null) {
        super(title, dataSourceItem);
    }

    @JsonProperty("ActionsModel")
    linker?: VisualizationLinker;

    get filterBindings() {
        return this.dataDefinition?.bindings?.bindings;
    }

    @JsonProperty("VisualizationSettings", { converter: settingConverter })
    settings!: TSettings;

    //todo: is it possible to create a Filters property that can properly handle both Tabular and Xmla data specs?
    // get filters(): VisualizationFilter[] {
    //     return this.dataDefinition.quickFilters;
    // }

    addDataFilter(fieldName: string, filter: IFilter): this {
        if (this.dataDefinition instanceof TabularDataDefinition) {
            const field = this.dataDefinition.fields.find(x => x.fieldName === fieldName);
            if (field) {               

                const filterField = field as FieldBase<IFilter>;
                filterField.dataFilter = filter;
                console.log(field);
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

