import { DashboardDataFilter } from "../DashboardDataFilter"
import { Binding } from "./Binding"
import { BindingOperatorType } from "./BindingOperatorType"
import { DashboardDataFilterBindingTarget } from "./DashboardDataFilterBindingTarget"
import { FieldBindingSource } from "./FieldBindingSource"

export class DashboardDataFilterBinding extends Binding<FieldBindingSource, DashboardDataFilterBindingTarget>
{
    constructor()
    constructor(dataFilter: DashboardDataFilter)
    constructor(dataFilter: DashboardDataFilter, fieldName: string)
    constructor(dataFilter?: DashboardDataFilter, fieldName?: string)
    {
        super()
        this.source = new FieldBindingSource() ;
        this.source.fieldName = fieldName ?? dataFilter?.fieldName;

        this.operator = BindingOperatorType.Equals;
        this.target = new DashboardDataFilterBindingTarget();
        this.target.dashboardFilterId = dataFilter?.id;
        this.target.dashboardFilterFieldName = dataFilter?.fieldName;
    }
}