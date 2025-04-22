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
import { Textarea } from '@lib/components/ui/textarea';
import { cn } from '@src/lib/utils';
import { cnParagraph, cnSmallText } from '@src/styles/font.style';
import { FormFieldProps } from '@src/types/FormFieldProps.js';

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
        <FormItem>
          <FormLabel htmlFor={id} className={cn('min-w-full', cnParagraph)}>
            {label}{' '}
          </FormLabel>
          <FormControl>
            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
              <Textarea
                id={id}
                placeholder={placeholder}
                className={cn(
                  'min-w-full',
                  'paragraph-placeholder',
                  'bg-input',
                  cnParagraph
                )}
                {...field}
                required
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
