import { LinkFilterType } from "../Enums";
import { LinkFilter } from "./LinkFilter";

export class DateLinkFilter extends LinkFilter {

    constructor() {
        super();
        this.name = "Date Filter";
        this.value = "_date.Date Filter";
        this.targetFilterId = "_date";
        this.type = LinkFilterType.GlobalFilter;
    }
}