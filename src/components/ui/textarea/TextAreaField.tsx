import { motion } from 'framer-motion';
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
import { Textarea } from '@lib/components/ui/textarea';

export function MessageField<T extends FieldValues>({
  control,
  errors,
  name,
  label,
  placeholder,
}: FormFieldProps<T>): JSX.Element {
  const id = React.useId();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='col-span-1 md:col-span-3'>
          <FormLabel htmlFor={id} className={cn('min-w-full', cnParagraph)}>
            <span className='sr-only'>{label}</span>
          </FormLabel>
          <FormControl className='flex-grow'>
            <motion.div whileHover={{ scale: 1.025 }} whileTap={{ scale: 0.9 }}>
              <Textarea
                id={id}
                placeholder={placeholder}
                className={cn(
                  cnParagraph,
                  'bg-input',
                  'h-full min-h-20 max-w-full resize-y xl:min-h-24',
                  'paragraph-placeholder'
                )}
                {...field}
                required
              />
            </motion.div>
          </FormControl>
          {errors?.message && (
            <FormMessage>{String(errors.message)}</FormMessage>
          )}
        </FormItem>
      )}
    />
  );
}
