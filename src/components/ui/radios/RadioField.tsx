import { motion } from 'framer-motion';
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

const EMAIL_TYPES = ['Offer', 'Inquiry', 'Other'] as const;

export function EmailTypeField<T extends FieldValues>({
  control,
  errors,
  label,
  name,
}: FormFieldProps<T>): JSX.Element {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='col-span-1 row-span-1 flex-none md:col-span-3'>
          <div className={cn(cnFlexCenterY, cnSmallGap)}>
            <FormLabel htmlFor={name} className={cnParagraph}>
              {label}
            </FormLabel>
            <FormControl>
              <RadioGroup
                id={name}
                onValueChange={field.onChange}
                defaultValue={field.value}
                className={cn('flex', cnSmallGap)}
              >
                {EMAIL_TYPES.map((type) => (
                  <FormItem
                    key={type}
                    className={cn('flex items-center space-y-0', cnSmallSpaceX)}
                  >
                    <FormControl>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <RadioGroupItem id={`${name}-${type}`} value={type} />
                      </motion.div>
                    </FormControl>
                    <FormLabel className={'font-normal'}>{type}</FormLabel>
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
