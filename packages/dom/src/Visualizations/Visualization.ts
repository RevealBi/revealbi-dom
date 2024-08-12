import { settingConverter } from "../Core/Serialization/Converters/SettingsConverter";
import { JsonProperty } from "../Core/Serialization/Decorators/JsonProperty";
import { DataSourceItem } from "../Data";
import { IFilterBindings } from "./Interfaces/IFilterBindings";
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
}

