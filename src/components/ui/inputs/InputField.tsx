import { motion } from 'framer-motion';
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
import { Input } from '@lib/components/ui/input';

export function InputField<T extends FieldValues>({
  control,
  errors,
  name,
  label,
  placeholder,
}: FormFieldProps<T>): JSX.Element {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor={name} className={cn('min-w-full', cnParagraph)}>
            {label}
          </FormLabel>
          <FormControl>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Input
                id={name}
                placeholder={placeholder}
                {...field}
                className={cn(
                  'min-w-full',
                  'paragraph-placeholder',
                  'bg-input',
                  cnParagraph
                )}
                required
              />
            </motion.div>
          </FormControl>
          <FormMessage>
            {errors?.message && (
              <FormMessage>{String(errors.message)}</FormMessage>
            )}
          </FormMessage>
        </FormItem>
      )}
    />
  );
}
