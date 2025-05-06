import { motion } from 'framer-motion';
import React from 'react';
import { FieldValues } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@lib/components/ui/form';
import { Input } from '@lib/components/ui/input';
import { cn } from '@src/lib/utils';
import { cnParagraph, cnSmallText } from '@src/styles/font.style';
import { FormFieldProps } from '@src/types/FormFieldProps.js';

export function InputField<T extends FieldValues>({
  control,
  errors,
  name,
  label,
  placeholder,
  autocomplete,
}: FormFieldProps<T>): JSX.Element {
  return (
    <FormField
      control={control}
      name={name}
      aria-required='true'
      render={({ field }) => (
        <FormItem>
          <FormLabel
            htmlFor={`input-${name}`}
            className={cn('min-w-full', cnParagraph)}
          >
            {label}{' '}
          </FormLabel>
          <FormControl>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Input
                id={`input-${name}`}
                placeholder={placeholder}
                autoComplete={autocomplete || name}
                {...field}
                className={cn(
                  'min-w-full',
                  'paragraph-placeholder',
                  'bg-input',
                  cnParagraph,
                  errors && 'border-destructive'
                )}
                required
                name={name}
              />
            </motion.div>
          </FormControl>
          {errors?.message && (
            <FormMessage className={cnSmallText}>
              {String(errors.message)}
            </FormMessage>
          )}
        </FormItem>
      )}
    />
  );
}
