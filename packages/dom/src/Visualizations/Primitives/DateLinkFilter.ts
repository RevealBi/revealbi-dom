import { LinkFilterType } from "../Enums";
import { LinkFilter } from "./LinkFilter";
import { DashboardDateFilter } from "../../Filters/DashboardDateFilter";
import { DateFilterRule } from "../../Filters/DateFilterRule";
import { registerJsonFactory } from "../../Core/Serialization/JsonConstruction";

export class DateLinkFilter extends LinkFilter {
    constructor(sourceFilter: DashboardDateFilter, target: DashboardDateFilter | string) {
        super();
        if (!sourceFilter) throw new TypeError("A source date filter is required.");
        const targetId = typeof target === "string" ? target : target?.id;
        if (!sourceFilter.id?.trim() || !targetId?.trim()) throw new TypeError("Source and target filter IDs are required.");
        this.name = typeof target === "string" ? sourceFilter.title : target.title;
        this.value = `${sourceFilter.id}.${sourceFilter.title}`;
        this.targetFilterId = targetId;
        this.type = LinkFilterType.GlobalFilter;
    }
    static {
        registerJsonFactory(this, () => {
            const source = new DashboardDateFilter(DateFilterRule.allTime);
            source.id = "_date";
            return new DateLinkFilter(source, "_date");
        });
    }
}
