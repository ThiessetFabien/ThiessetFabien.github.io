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
import { cnSmallSpaceX } from '@styles/boxModel.style';
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
        <FormItem
          className={cn(
            'col-span-1 row-span-1 flex items-center space-y-0 md:col-span-3',
            cnSmallSpaceX,
            cnParagraph
          )}
        >
          <FormControl>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Checkbox
                id={id}
                name={name}
                checked={field.value}
                onCheckedChange={field.onChange}
                required
              />
            </motion.div>
          </FormControl>
          <FormLabel htmlFor={id} className={cn(cnParagraph, 'mb-0 mt-0')}>
            {label}
          </FormLabel>
          {errors?.message && (
            <FormMessage>{String(errors.message)}</FormMessage>
          )}
        </FormItem>
      )}
    />
  );
}
