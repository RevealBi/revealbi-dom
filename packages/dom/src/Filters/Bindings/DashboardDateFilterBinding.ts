import { Binding } from "./Binding";
import { BindingOperatorType } from "./BindingOperatorType";
import { DashboardDateFilterBindingTarget } from "./DashboardDateFilterBindingTarget";
import { FieldBindingSource } from "./FieldBindingSource";

export class DashboardDateFilterBinding extends Binding<FieldBindingSource, DashboardDateFilterBindingTarget>
{

    constructor()
    constructor(fieldName: string)
    constructor(fieldName?: string)
    {
        super();
        this.operator = BindingOperatorType.Between;
        this.source = new FieldBindingSource();
        this.source.fieldName = fieldName;
        this.target = new DashboardDateFilterBindingTarget();
    }
}