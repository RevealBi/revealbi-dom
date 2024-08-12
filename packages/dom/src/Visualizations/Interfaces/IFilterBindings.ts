import { BindingBase } from "../../Filters";

export interface IFilterBindings {
    get filterBindings(): BindingBase[] | undefined;
}