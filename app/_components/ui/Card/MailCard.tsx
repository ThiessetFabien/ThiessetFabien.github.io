import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/lib/components/ui/input';
import { Button } from '@/lib/components/ui/button';
import { formSchema } from '@/schemas/mailSchema';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/lib/components/ui/form';
import type { CardProps } from '@/types/CardProps';
import { toast } from '@/lib/hooks/use-toast';
import { Textarea } from '@/lib/components/ui/textarea';
import { cnGap, cnSpaceY } from '@/styles/boxModelStyles';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/lib/components/ui/select';
import { cnParagraph } from '@/styles/fontStyles';
import { cn } from '@/lib/utils';
import { ActionButton } from '@/ui/CallToAction/ActionButton';
import { FooterCard } from '@/ui/Card/LayoutCard/FooterCard';
import { cnMarginTop } from '@/styles/boxModelStyles';

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
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      mail: '',
      phone: '',
      type: 'offer',
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cnSpaceY}>
        <div className={cn(cnGap, 'grid grid-cols-1 md:grid-cols-4')}>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel className={cn('min-w-full', cnParagraph)}>
                  Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder='John Doe'
                    {...field}
                    className={cn(
                      'min-w-full',
                      'paragraph-placeholder',
                      cnParagraph
                    )}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='phone'
            render={({ field }) => (
              <FormItem>
                <FormLabel className={cn('min-w-full', cnParagraph)}>
                  Phone
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder='0123456789'
                    {...field}
                    className={cn(
                      'min-w-full',
                      'paragraph-placeholder',
                      cnParagraph
                    )}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />{' '}
          <FormField
            control={form.control}
            name='mail'
            render={({ field }) => (
              <FormItem>
                <FormLabel className={cn('min-w-full', cnParagraph)}>
                  Mail
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder='your@mail.com'
                    {...field}
                    className={cn(
                      'min-w-full',
                      'paragraph-placeholder',
                      cnParagraph
                    )}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='type'
            render={({ field }) => (
              <FormItem>
                <FormLabel className={cn('min-w-full', cnParagraph)}>
                  Type of mail...
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        className={cn(
                          'min-w-full',
                          'paragraph-placeholder',
                          cnParagraph
                        )}
                        placeholder='Select a type of email to display'
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className={cn('min-w-full', cnParagraph)}>
                    <SelectItem
                      className={cn('min-w-full', cnParagraph)}
                      value='offer'
                    >
                      offer
                    </SelectItem>
                    <SelectItem
                      className={cn('min-w-full', cnParagraph)}
                      value='collaboration'
                    >
                      collaboration
                    </SelectItem>
                    <SelectItem
                      className={cn('min-w-full', cnParagraph)}
                      value='question'
                    >
                      question
                    </SelectItem>
                    <SelectItem
                      className={cn('min-w-full', cnParagraph)}
                      value='other'
                    >
                      other
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name='message'
          render={({ field }) => (
            <FormItem>
              <FormLabel className={cn('min-w-full', cnParagraph)}>
                Your message :
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Tell me a little bit about your project...'
                  className={cn(
                    cnParagraph,
                    'h-44 min-w-full resize-y',
                    'paragraph-placeholder'
                  )}
                  {...field}
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
          className={cnMarginTop}
        />
      </form>
    </Form>
  );
};
