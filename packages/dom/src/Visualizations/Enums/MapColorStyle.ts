export enum MapColorStyle {
    /// <summary>
    /// Use a range of seven colors as a color scheme, and fill the regions depending on data value.
    /// </summary>
    //[EnumMember(Value = "BUCKETING")]
    RangeOfValues = "BUCKETING",
    /// <summary>
    /// Use one color to for all regions that contain data. Regions without data will be gray.
    /// </summary>
    //[EnumMember(Value = "SINGLE")]
    SingleColor = "SINGLE",
}
