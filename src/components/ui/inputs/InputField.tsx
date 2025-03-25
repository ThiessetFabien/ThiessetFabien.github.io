import React from 'react';
import { FieldValues } from 'react-hook-form';

import { cn } from '@/src/lib/utils';
import { cnParagraph } from '@/src/styles/font.style';
import { FormFieldProps } from '@/src/types/FormFieldProps.js';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@lib/components/ui/form';
import { Input } from '@lib/components/ui/input';

export function InputField<T extends FieldValues>({
  control,
  errors,
  name,
  label,
  placeholder,
  autocomplete,
}: FormFieldProps<T>): JSX.Element {
  const id = React.useId();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor={id} className={cn('min-w-full', cnParagraph)}>
            {label}{' '}
          </FormLabel>
          <FormControl>
            <Input
              id={id}
              placeholder={placeholder}
              autoComplete={autocomplete || name}
              {...field}
              className={cn(
                'min-w-full',
                'paragraph-placeholder',
                'bg-input',
                cnParagraph
              )}
              style={{
                transition: 'transform 0.2s ease',
              }}
              onFocus={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
              required
            />
          </FormControl>
          {errors?.message && (
            <FormMessage>{String(errors.message)}</FormMessage>
          )}
        </FormItem>
      )}
    />
  );
}
