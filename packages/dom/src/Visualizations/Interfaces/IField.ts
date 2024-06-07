export interface IField
{
    /// <summary>
    /// Get or sets the expression to use if this field is a calculated field.
    /// </summary>
    expression?: string;

    /// <summary>
    /// Gets or sets the field name. It must match the name as it exists in the data source.
    /// </summary>
    fieldName?: string;

    /// <summary>
    /// Gets or sets the field label. This is the friendly name and will be displayed in the UI.
    /// </summary>
    fieldLabel?: string;

    /// <summary>
    /// Gets or sets whether this is a calucated field.
    /// </summary>
    isCalculated: boolean;
}