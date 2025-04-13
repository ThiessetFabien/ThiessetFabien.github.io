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
