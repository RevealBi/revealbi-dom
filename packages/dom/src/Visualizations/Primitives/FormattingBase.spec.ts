import { describe, expect, it } from "vitest";
import { DateFormatting, JsonConvert, NumberFormatting } from "../../index";

const wire = (value: object): any => JsonConvert.serializeObject(value);
const formattingTypes = [["DateFormattingSpecType", DateFormatting], ["NumberFormattingSpecType", NumberFormatting]] as const;

describe("formatting locale", () => {
    it.each(formattingTypes)("leaves the locale out of %s by default", (_, Type) => {
        const formatting = new Type();
        expect(formatting.locale).toBeUndefined();
        expect(wire(formatting)).not.toHaveProperty("Locale");
    });

    it.each(formattingTypes)("writes and loads the locale of %s", (typeName, Type) => {
        const formatting = new Type();
        formatting.locale = "de-DE";
        const json = wire(formatting);
        expect(json).toMatchObject({ _type: typeName, Locale: "de-DE" });
        expect(JsonConvert.deserializeObject(json, Type).locale).toBe("de-DE");
    });
});
