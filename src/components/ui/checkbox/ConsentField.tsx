import { motion } from 'framer-motion';
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
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn(
            'col-span-1 row-span-1 flex flex-none space-y-0 md:col-span-3',
            cnSmallSpaceX,
            cnParagraph
          )}
        >
          <FormControl>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Checkbox
                id={name}
                checked={field.value}
                onCheckedChange={field.onChange}
                required
              />
            </motion.div>
          </FormControl>
          {errors?.message && (
            <FormMessage>{String(errors.message)}</FormMessage>
          )}
          <FormLabel htmlFor={name} className={cnParagraph}>
            {label}
          </FormLabel>
        </FormItem>
      )}
    />
  );
}
