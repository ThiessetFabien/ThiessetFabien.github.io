import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Checkbox } from '@/lib/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/lib/components/ui/form';
import { Input } from '@/lib/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/lib/components/ui/radio-group';
import { Textarea } from '@/lib/components/ui/textarea';
import { toast } from '@/lib/hooks/use-toast';
import { cn } from '@/lib/utils';
import { formSchema } from '@/schemas/mailSchema';
import { cnSmallGap, cnSmallSpaceX } from '@/styles/boxModelStyles';
import { cnFlexCenterY } from '@/styles/flexStyles';
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
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: 'Offer',
      name: '',
      phone: '',
      email: '',
      message: '',
      consent: false,
    },
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = form;

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const mailtoLink = `mailto:${mailto}?subject=Contact Form Submission&body=${encodeURIComponent(
      `Type: ${data.type}\nName: ${data.name}\nPhone: ${data.phone}\nMessage: ${data.message}`
    )}`;

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
        className={cn(className, 'flex flex-col')}
      >
        <div
          className={cn(
            cnSmallGap,
            'grid auto-rows-auto grid-cols-1 md:grid-cols-3'
          )}
        >
          <FormField
            control={control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  htmlFor='name'
                  className={cn('min-w-full', cnParagraph)}
                >
                  Name and family name :
                </FormLabel>
                <FormControl>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Input
                      id='name'
                      placeholder='John Doe'
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
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name='phone'
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  htmlFor='phone'
                  className={cn('min-w-full', cnParagraph)}
                >
                  Phone :
                </FormLabel>
                <FormControl>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Input
                      id='phone'
                      placeholder='0123456789'
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
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  htmlFor='email'
                  className={cn('min-w-full', cnParagraph)}
                >
                  Email :
                </FormLabel>
                <FormControl>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Input
                      placeholder='your@mail.com'
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
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name='type'
            render={({ field }) => (
              <FormItem className='col-span-1 row-span-1 flex-none md:col-span-3'>
                <div className={cn(cnFlexCenterY, cnSmallGap)}>
                  <FormLabel htmlFor='type' className={cnParagraph}>
                    Type of email :
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className={cn('flex', cnSmallGap)}
                    >
                      <FormItem
                        className={cn(
                          'flex items-center space-y-0',
                          cnSmallSpaceX
                        )}
                      >
                        <FormControl>
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <RadioGroupItem value='Offer' />
                          </motion.div>
                        </FormControl>
                        <FormLabel className={'font-normal'}>Offer</FormLabel>
                      </FormItem>
                      <FormItem className='flex items-center space-x-3 space-y-0'>
                        <FormControl>
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <RadioGroupItem value='Collaboration' />
                          </motion.div>
                        </FormControl>
                        <FormLabel className={'font-normal'}>
                          Collaboration
                        </FormLabel>
                      </FormItem>
                      <FormItem className='flex items-center space-x-3 space-y-0'>
                        <FormControl>
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <RadioGroupItem value='Other' />
                          </motion.div>
                        </FormControl>
                        <FormLabel className={'font-normal'}>Other</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name='message'
            render={({ field }) => (
              <FormItem className='col-span-1 md:col-span-3'>
                <FormLabel
                  htmlFor='message'
                  className={cn('min-w-full', cnParagraph)}
                >
                  <span className='sr-only'>Message</span>
                </FormLabel>
                <FormControl className='flex-grow'>
                  <motion.div
                    whileHover={{ scale: 1.025 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Textarea
                      id='message'
                      placeholder='Tell me a little bit about your project...'
                      className={cn(
                        cnParagraph,
                        'bg-input',
                        'h-full min-h-20 max-w-full resize-y xl:min-h-24',
                        'paragraph-placeholder'
                      )}
                      {...field}
                      required
                    />
                  </motion.div>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name='consent'
            render={({ field }) => (
              <FormItem
                className={cn(
                  'col-span-1 row-span-1 flex flex-none space-y-0 shadow md:col-span-3',
                  cnSmallSpaceX,
                  cnParagraph
                )}
              >
                {/* className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow' */}
                <FormControl>
                  <Checkbox
                    id='consent'
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    required
                  />
                </FormControl>
                <FormLabel htmlFor='consent' className={cnParagraph}>
                  I agree to be contacted using the provided information.
                </FormLabel>
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
            className='col-span-1 row-span-1 flex-none md:col-span-3'
          />
        </div>
      </form>
    </Form>
  );
};
