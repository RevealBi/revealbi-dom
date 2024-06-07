import { JsonProperty } from "../../Core/Serialization/Decorators/JsonProperty";
import { ShapeType } from "../Enums/ShapeType";
import { Band } from "./Band";

export abstract class ShapeBand extends Band
{
    @JsonProperty("Shape")
    shape: ShapeType = ShapeType.None;
}