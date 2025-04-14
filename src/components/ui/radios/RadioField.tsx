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
import { cnSmallGap, cnSmallSpaceX } from '@styles/boxModel.style';
import { cnFlexCenterY } from '@styles/flex.style';
import { cnParagraph } from '@styles/font.style';

const EMAIL_TYPES = ['Offre', 'Question', 'Autre'] as const;

/**
 * A form field component for selecting email types using radio buttons.
 * Renders a radio group with animation effects on hover and tap.
 *
 * @template T - Type extending FieldValues from React Hook Form
 * @param {Object} props - The component props
 * @param {Control<T>} props.control - The React Hook Form control object
 * @param {FieldError | undefined} props.errors - Form field errors object
 * @param {string} props.label - The label text for the field
 * @param {Path<T>} props.name - The name of the form field
 * @returns {JSX.Element} A form field with radio buttons for email type selection
 *
 * @example
 * <EmailTypeField
 *   control={control}
 *   errors={errors.emailType}
 *   label="Email Type"
 *   name="emailType"
 * />
 */
export function EmailTypeField<T extends FieldValues>({
  control,
  errors,
  label,
  name,
}: FormFieldProps<T>): JSX.Element {
  const id = React.useId();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='col-span-1 row-span-1 flex-none md:col-span-3'>
          <FormLabel htmlFor={id} className={cnParagraph}>
            {label}
          </FormLabel>
          <div className={cn(cnSmallGap, cnFlexCenterY)}>
            <FormControl>
              <RadioGroup
                name={name}
                onValueChange={field.onChange}
                defaultValue={field.value}
                className={cn('flex', cnSmallGap)}
              >
                {EMAIL_TYPES.map((type) => (
                  <FormItem
                    key={type}
                    className={cn(cnFlexCenterY, cnSmallSpaceX, 'space-y-0')}
                  >
                    <FormControl>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <RadioGroupItem id={id} value={type} />
                      </motion.div>
                    </FormControl>
                    <FormLabel htmlFor={id} className={'font-normal'}>
                      {type}
                    </FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
            {errors?.message && (
              <FormMessage>{String(errors.message)}</FormMessage>
            )}
          </div>
        </FormItem>
      )}
    />
  );
}
