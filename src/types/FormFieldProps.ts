import { FieldErrors, FieldValues, Control, Path } from 'react-hook-form';

/**
 * Props pour les champs de formulaire utilisant React Hook Form
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
