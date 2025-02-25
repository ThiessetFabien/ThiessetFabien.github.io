import { Control, FieldError, FieldValues, Path } from 'react-hook-form';

export interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  errors?: FieldError;
}
