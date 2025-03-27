export class ColorUtility {
    /**
     * Converts a color string to an integer.
     * @param color The color string to convert.
     * @returns The integer representation of the color.
     */
    static fromColorString(color: string): number {
        color = color.trim();

        if (color.startsWith('#')) {
            return this.hexColorToInt(color);
        }

        if (color.startsWith('rgb')) {
            return this.rgbaStringToInt(color);
        }

        throw new Error(`Unsupported color format: ${color}`);
    }

    /**
     * Converts an integer to a hex color string.
     * @param argb The integer to convert.
     * @returns The hex color string representation of the color.
     */
    static intToHexColorString(argb: number): string {
        const uint = argb >>> 0;

        const a = (uint >> 24) & 0xff;
        const r = (uint >> 16) & 0xff;
        const g = (uint >> 8) & 0xff;
        const b = uint & 0xff;

        const rgbHex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`.toUpperCase();

        if (a < 255) {
            const alphaHex = a.toString(16).padStart(2, '0').toUpperCase();
            return `${rgbHex}${alphaHex}`; // #RRGGBBAA
        }

        return rgbHex; // #RRGGBB
    }

    /**
     * Converts a hex color string to an integer.
     * @param hex The hex color string to convert.
     * @returns The integer representation of the color. 
     */
    static hexColorToInt(hex: string): number {
        hex = hex.replace(/^#/, '');
    
        let argb: number;
    
        if (hex.length === 6) {
            // #RRGGBB → assume alpha = 0xFF
            const r = parseInt(hex.slice(0, 2), 16);
            const g = parseInt(hex.slice(2, 4), 16);
            const b = parseInt(hex.slice(4, 6), 16);
            argb = (0xff << 24) | (r << 16) | (g << 8) | b;
        } else if (hex.length === 8) {
            // #RRGGBBAA
            const r = parseInt(hex.slice(0, 2), 16);
            const g = parseInt(hex.slice(2, 4), 16);
            const b = parseInt(hex.slice(4, 6), 16);
            const a = parseInt(hex.slice(6, 8), 16);
            argb = (a << 24) | (r << 16) | (g << 8) | b;
        } else {
            throw new Error(`Invalid hex color format: ${hex}`);
        }
    
        return argb | 0;
    }

    /**
     * Converts an RGBA string to an integer.
     * @param rgba The RGBA string to convert.
     * @returns The integer representation of the color.
     */
    static rgbaStringToInt(rgba: string): number {
        const rgbaRegex = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?\)/i;
        const match = rgba.match(rgbaRegex);

        if (!match) {
            throw new Error(`Invalid rgba format: ${rgba}`);
        }

        const r = parseInt(match[1], 10);
        const g = parseInt(match[2], 10);
        const b = parseInt(match[3], 10);
        const a = match[4] !== undefined ? Math.round(parseFloat(match[4]) * 255) : 255;

        const argb = (a << 24) | (r << 16) | (g << 8) | b;

        return argb | 0; // Convert to signed 32-bit
    }
}