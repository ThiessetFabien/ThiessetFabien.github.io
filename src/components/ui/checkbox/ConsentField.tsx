import { motion } from 'framer-motion';
import React from 'react';
import type { FieldValues } from 'react-hook-form';

import { Checkbox } from '@lib/components/ui/checkbox';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@lib/components/ui/form';
import { cn } from '@lib/utils';
import type { FormFieldProps } from '@src/types/FormFieldProps';
import { cnParagraph, cnSmallText } from '@styles/font.style';

/**
 * A reusable consent field component for forms, built with TypeScript and React.
 * This component integrates with React Hook Form and provides a styled checkbox
 * with motion effects and error handling.
 *
 * @template T - A generic type extending `FieldValues` from React Hook Form.
 *
 * @param {FormFieldProps<T>} props - The props for the ConsentField component.
 * @param {Control<T>} props.control - The control object from React Hook Form for managing form state.
 * @param {FieldError | undefined} props.errors - An optional error object for displaying validation messages.
 * @param {string} props.name - The name of the field, used for form registration and state management.
 * @param {string} props.label - The label text displayed next to the checkbox.
 *
 * @returns {JSX.Element} A JSX element representing the consent field.
 */
export function ConsentField<T extends FieldValues>({
  control,
  errors,
  name,
  label,
}: FormFieldProps<T>): JSX.Element {
  const id = React.useId();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='flex flex-row items-start space-x-3 space-y-0'>
          <FormControl>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Checkbox
                id={id}
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </motion.div>
          </FormControl>
          <div className='space-y-1 leading-none'>
            <FormLabel htmlFor={id} className={cn('min-w-full', cnParagraph)}>
              {label}{' '}
            </FormLabel>
            {errors?.message && (
              <FormMessage className={cnSmallText}>
                {String(errors.message)}
              </FormMessage>
            )}
          </div>
        </FormItem>
      )}
    />
  );
}
