export enum MapColorMode {
    /// <summary>
    /// Allows you to establish styling rules per ranges of data - upper, middle, and lower
    /// </summary>
    ConditionalFormatting = "ConditionalFormatting",
    /// <summary>
    /// Use a range of seven colors as a color scheme, where colors progressing light to dark represent data values from low to high.
    /// </summary>
    //[EnumMember(Value = "Range")]
    RangeOfValues  = "Range",
    /// <summary>
    /// Use one color to for all markers.
    /// </summary>
    //[EnumMember(Value = "Single")]
    SingleColor  = "Single"
}