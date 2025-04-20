import { motion } from 'framer-motion';
import React from 'react';
import { FieldValues } from 'react-hook-form';

import { FormFieldProps } from '@/src/types/FormFieldProps.js';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@lib/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@lib/components/ui/radio-group';
import { cn } from '@lib/utils';
import { cnParagraph } from '@styles/font.style';

export function EmailTypeField<T extends FieldValues>({
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
        <FormItem>
          <FormLabel
            htmlFor={id}
            className={cn(
              'min-w-full',
              cnParagraph,
              isCompact && 'text-sm lg:text-xs'
            )}
          >
            {label}{' '}
          </FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className={cn('flex flex-col sm:flex-row', isCompact && 'gap-1')}
              id={id}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn('flex items-center', isCompact && 'space-x-1')}
              >
                <RadioGroupItem value='Offer' id='offer' />
                <FormLabel
                  htmlFor='offer'
                  className={cn('ml-2', isCompact && 'text-sm lg:text-xs')}
                >
                  Offre
                </FormLabel>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn('flex items-center', isCompact && 'space-x-1')}
              >
                <RadioGroupItem value='Question' id='question' />
                <FormLabel
                  htmlFor='question'
                  className={cn('ml-2', isCompact && 'text-sm lg:text-xs')}
                >
                  Question
                </FormLabel>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn('flex items-center', isCompact && 'space-x-1')}
              >
                <RadioGroupItem value='Other' id='other' />
                <FormLabel
                  htmlFor='other'
                  className={cn('ml-2', isCompact && 'text-sm lg:text-xs')}
                >
                  Autre
                </FormLabel>
              </motion.div>
            </RadioGroup>
          </FormControl>
          {errors?.message && (
            <FormMessage className={cn(isCompact ? 'text-xs' : 'text-sm')}>
              {String(errors.message)}
            </FormMessage>
          )}
        </FormItem>
      )}
    />
  );
}
