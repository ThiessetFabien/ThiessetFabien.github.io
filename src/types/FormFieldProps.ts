import type { FieldErrors, FieldValues, Control, Path } from 'react-hook-form';

/**
 * Props for compact display mode
 */
export interface CompactMode {
  /**
   * Indicates if the field should be displayed in compact mode
   * @default false
   */
  isCompact?: boolean;
}

/**
 * Props for form fields using React Hook Form
 */
export interface FormFieldProps<T extends FieldValues> extends CompactMode {
  /** Control from React Hook Form */
  control: Control<T>;
  /** Error object for the field */
  errors?: FieldErrors;
  /** Field name in the form */
  name: Path<T>;
  /** Label for the field */
  label: string;
  /** Placeholder text */
  placeholder?: string;
  /** Autocomplete attribute */
  autocomplete?: string;
}
