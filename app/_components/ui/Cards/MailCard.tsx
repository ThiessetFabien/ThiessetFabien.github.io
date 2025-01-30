import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/lib/components/ui/form';
import { Input } from '@/lib/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/lib/components/ui/select';
import { Textarea } from '@/lib/components/ui/textarea';
import { toast } from '@/lib/hooks/use-toast';
import { cn } from '@/lib/utils';
import { formSchema } from '@/schemas/mailSchema';
import { cnGap } from '@/styles/boxModelStyles';
import { cnParagraph } from '@/styles/fontStyles';
import type { CardProps } from '@/types/CardProps';
import { FooterCard } from '@/ui/Cards/LayoutCards/FooterCard';

type FormSchema = z.infer<typeof formSchema>;

export const MailCard: React.FC<{
  mailto: CardProps['mailto'];
  cta1: CardProps['cta1'];
  icon1: CardProps['icon1'];
  href1: CardProps['href1'];
  downloadActive1: CardProps['downloadActive1'];
  cta2: CardProps['cta2'];
  icon2: CardProps['icon2'];
  href2: CardProps['href2'];
  downloadActive2: CardProps['downloadActive2'];
  cta3: CardProps['cta3'];
  icon3: CardProps['icon3'];
  href3: CardProps['href3'];
  downloadActive3: CardProps['downloadActive3'];
  className: CardProps['className'];
}> = ({
  mailto,
  cta1,
  icon1,
  href1,
  downloadActive1,
  cta2,
  icon2,
  href2,
  downloadActive2,
  cta3,
  icon3,
  href3,
  downloadActive3,
  className,
}) => {
  type FormData = z.infer<typeof formSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      type: 'Offer',
      message: '',
    },
  });

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = form;

  const onSubmit: SubmitHandler<FormSchema> = (data: FormData) => {
    const mailtoLink = `mailto:${mailto}?subject=${data.type}&body=${data.message}`;
    window.location.href = mailtoLink;
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className='bg-background0 mt-2 w-[340px] p-4'>
          <code className='text-foreground'>
            {JSON.stringify(data, null, 2)}
          </code>
        </pre>
      ),
    });
    console.log(data);
  };

  return (
    <Form {...form} aria-labelledby='contact'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={(cn(className), 'flex flex-grow flex-col')}
      >
        <div
          className={cn(
            cnGap,
            'grid auto-rows-auto grid-cols-1 grid-rows-1 items-end md:grid-cols-4'
          )}
        >
          <FormField
            control={form.control}
            name='type'
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  htmlFor='type'
                  className={cn('min-w-full', cnParagraph)}
                >
                  Type of email
                </FormLabel>
                <FormControl>
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                  >
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className='bg-input'>
                        <SelectValue
                          className={cn(
                            'min-w-full',
                            'paragraph-placeholder',
                            cnParagraph
                          )}
                          placeholder='Select a type of email to display'
                        />
                      </SelectTrigger>
                      <SelectContent className={cn('min-w-full', cnParagraph)}>
                        <SelectItem
                          className={cn('min-w-full', cnParagraph)}
                          value='offer'
                        >
                          Offer
                        </SelectItem>
                        <SelectItem
                          className={cn('min-w-full', cnParagraph)}
                          value='collaboration'
                        >
                          Inquiry
                        </SelectItem>
                        <SelectItem
                          className={cn('min-w-full', cnParagraph)}
                          value='other'
                        >
                          Other
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>
                </FormControl>
                <FormMessage>{errors.type?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormItem>
            <FormLabel htmlFor='name' className={cn('min-w-full', cnParagraph)}>
              Name
            </FormLabel>
            <FormControl>
              <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
                <Input
                  id='name'
                  placeholder='John Doe'
                  {...register('name')}
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
            <FormMessage>{errors.name?.message}</FormMessage>
          </FormItem>
          <FormItem>
            <FormLabel
              htmlFor='phone'
              className={cn('min-w-full', cnParagraph)}
            >
              Phone
            </FormLabel>
            <FormControl>
              <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
                <Input
                  id='phone'
                  placeholder='0123456789'
                  {...register('phone')}
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
            <FormMessage>{errors.phone?.message}</FormMessage>
          </FormItem>
          <FormItem>
            <FormLabel
              htmlFor='email'
              className={cn('min-w-full', cnParagraph)}
            >
              Email
            </FormLabel>
            <FormControl>
              <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
                <Input
                  placeholder='your@mail.com'
                  {...register('email')}
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
            <FormMessage />
          </FormItem>
          <FormItem className='col-span-1 md:col-span-4'>
            <FormLabel
              htmlFor='message'
              className={cn('min-w-full', cnParagraph)}
            >
              Message
            </FormLabel>
            <FormControl className='flex-grow'>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.8 }}
              >
                <Textarea
                  id='message'
                  placeholder='Tell me a little bit about your project...'
                  className={cn(
                    cnParagraph,
                    'bg-input',
                    'h-full min-h-32 max-w-full resize-y xl:min-h-36',
                    'paragraph-placeholder'
                  )}
                  {...register('message')}
                  required
                />
              </motion.div>
            </FormControl>
            <FormMessage>{errors.message?.message}</FormMessage>
          </FormItem>
          <FooterCard
            mailto={mailto}
            cta1={cta1}
            icon1={icon1}
            href1={href1}
            downloadActive1={downloadActive1}
            cta2={cta2}
            icon2={icon2}
            href2={href2}
            downloadActive2={downloadActive2}
            cta3={cta3}
            icon3={icon3}
            href3={href3}
            downloadActive3={downloadActive3}
            className='col-span-1 row-span-1 flex-none md:col-span-4'
          />
        </div>
      </form>
    </Form>
  );
};
