import { Binding } from "./Binding";
import { BindingOperatorType } from "./BindingOperatorType";
import { DashboardDateFilterBindingTarget } from "./DashboardDateFilterBindingTarget";
import { FieldBindingSource } from "./FieldBindingSource";
import { DashboardDateFilter } from "../DashboardDateFilter";
import { DateFilterRule } from "../DateFilterRule";
import { registerJsonFactory } from "../../Core/Serialization/JsonConstruction";

export class DashboardDateFilterBinding extends Binding<FieldBindingSource, DashboardDateFilterBindingTarget> {
    constructor(dateFilter: DashboardDateFilter, fieldName = "Date") {
        super();
        if (!dateFilter) throw new TypeError("A dashboard date filter is required.");
        this.operator = BindingOperatorType.Between;
        this.source = new FieldBindingSource();
        this.source.fieldName = fieldName;
        this.target = new DashboardDateFilterBindingTarget();
        this.target.dashboardFilterId = dateFilter.id;
    }
    static {
        registerJsonFactory(this, () => {
            const binding = new DashboardDateFilterBinding(new DashboardDateFilter(DateFilterRule.allTime));
            binding.target!.dashboardFilterId = "_date";
            return binding;
        });
    }
}
