import { zodResolver } from '@hookform/resolvers/zod';
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
import { cnMarginTop } from '@/styles/boxModelStyles';
import { cnParagraph } from '@/styles/fontStyles';
import type { CardProps } from '@/types/CardProps';
import { FooterCard } from '@/ui/Card/LayoutCard/FooterCard';

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
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    ...form
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      type: 'Offer',
      message: '',
    },
  });

  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    const mailtoLink = `mailto:${mailto}?subject=${data.type}&body=${data.message}`;
    window.location.href = mailtoLink;
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className='bg-background0 mt-2 w-[340px] rounded-md p-4'>
          <code className='text-foreground'>
            {JSON.stringify(data, null, 2)}
          </code>
        </pre>
      ),
    });
  };

  return (
    <section aria-labelledby='contact'>
      <Form
        {...form}
        onSubmit={handleSubmit(onSubmit)}
        className={cn(className, 'flex flex-1')}
      >
        <div
          className={cn(
            cnGap,
            'grid auto-rows-auto grid-cols-1 grid-rows-1 md:grid-cols-4'
          )}
        >
          <FormField
            control={control}
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
            </FormControl>
            <FormMessage />
          </FormItem>
          <FormItem className='col-span-4 auto-rows-auto grid-cols-1 md:grid-cols-4'>
            <FormLabel
              htmlFor='message'
              className={cn('min-w-full', cnParagraph)}
            >
              Message
            </FormLabel>
            <FormControl>
              <Textarea
                id='message'
                placeholder='Tell me a little bit about your project...'
                className={cn(
                  cnParagraph,
                  'bg-input',
                  'h-28 min-w-full resize-y',
                  'paragraph-placeholder'
                )}
                {...register('message')}
                required
              />
            </FormControl>
            <FormMessage>{errors.message?.message}</FormMessage>
          </FormItem>
        </div>
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
          className={cn(cnMarginTop, 'grid-cols-1 grid-rows-1 md:grid-cols-4')}
        />
      </Form>
    </section>
  );
};
