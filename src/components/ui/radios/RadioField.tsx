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
import { RadioGroup, RadioGroupItem } from '@lib/components/ui/radio-group';
import { cn } from '@lib/utils';
import { FormFieldProps } from '@src/types/FormFieldProps.js';
import { cnParagraph, cnSmallText } from '@styles/font.style';

export function EmailTypeField<T extends FieldValues>({
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
        <FormItem>
          <FormLabel htmlFor={id} className={cn('min-w-full', cnParagraph)}>
            {label}{' '}
          </FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className={cn('flex flex-col sm:flex-row')}
              id={id}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn('flex items-center')}
              >
                <RadioGroupItem value='Offer' id='offer' />
                <FormLabel htmlFor='offer' className={cn('ml-2')}>
                  Offre
                </FormLabel>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn('flex items-center')}
              >
                <RadioGroupItem value='Question' id='question' />
                <FormLabel htmlFor='question' className={cn('ml-2')}>
                  Question
                </FormLabel>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn('flex items-center')}
              >
                <RadioGroupItem value='Other' id='other' />
                <FormLabel htmlFor='other' className={cn('ml-2')}>
                  Autre
                </FormLabel>
              </motion.div>
            </RadioGroup>
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
