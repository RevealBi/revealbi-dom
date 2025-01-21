import { settingConverter } from "../Core/Serialization/Converters/SettingsConverter";
import { JsonProperty } from "../Core/Serialization/Decorators/JsonProperty";
import { DataSourceItem } from "../Data";
import { VisualizationLinker } from "./Primitives/VisualizationLinker";
import { VisualizationSettings } from "./Settings/VisualizationSettings";
import { VisualizationBase } from "./VisualizationBase";

export abstract class Visualization<TSettings extends VisualizationSettings> extends VisualizationBase {

    constructor(title: string, dataSourceItem: DataSourceItem | null) {
        super(title, dataSourceItem);
    }

    @JsonProperty("ActionsModel", { type: VisualizationLinker })
    linker?: VisualizationLinker;

    @JsonProperty("VisualizationSettings", { converter: settingConverter })
    settings!: TSettings;
}

