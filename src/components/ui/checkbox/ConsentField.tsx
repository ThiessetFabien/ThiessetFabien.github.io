import { motion } from 'framer-motion';
import React from 'react';
import type { FieldValues } from 'react-hook-form';

import type { FormFieldProps } from '@/src/types/FormFieldProps';
import { Checkbox } from '@lib/components/ui/checkbox';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@lib/components/ui/form';
import { cn } from '@lib/utils';
import { cnParagraph } from '@styles/font.style';

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
 * @param {boolean} [props.isCompact=false] - An optional boolean to determine if the compact style should be applied.
 *
 * @returns {JSX.Element} A JSX element representing the consent field.
 */
export function ConsentField<T extends FieldValues>({
  control,
  errors,
  name,
  label,
  isCompact = false,
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
                className={cn(isCompact && 'h-4 w-4')}
              />
            </motion.div>
          </FormControl>
          <div className='space-y-1 leading-none'>
            <FormLabel
              htmlFor={id}
              className={cn(
                'min-w-full',
                cnParagraph,
                isCompact && 'text-sm leading-tight lg:text-xs'
              )}
            >
              {label}{' '}
            </FormLabel>
            {errors?.message && (
              <FormMessage className={cn(isCompact ? 'text-xs' : 'text-sm')}>
                {String(errors.message)}
              </FormMessage>
            )}
          </div>
        </FormItem>
      )}
    />
  );
}
