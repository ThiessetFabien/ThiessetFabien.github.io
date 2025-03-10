import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { FooterCard } from '@/src/components/ui/cards/layouts.cards/FooterCard';
import { ClientSanitizationService } from '@/src/lib/services/client-sanitize.service';
import { cn } from '@/src/lib/utils';
import type { FormSchema } from '@/src/schemas/contactForm.schema';
import { ContactFormSchema } from '@/src/schemas/contactForm.schema';
import { cnSmallGap } from '@/src/styles/boxModel.style';
import type { ActionButtonProps } from '@/src/types/ActionButtonProps';
import { Form } from '@lib/components/ui/form';
import { useToast } from '@lib/hooks/use-toast';
import type { CardProps } from '@src/types/CardProps';
import { InputField } from '@ui/inputs/InputField';
import { EmailTypeField } from '@ui/radios/RadioField';

import { ConsentField } from '../ui/checkbox/ConsentField';
import { MessageField } from '../ui/textarea/TextAreaField';

export const ContactForm: React.FC<{
  mailto: CardProps['mailto'];
  cta1: ActionButtonProps['cta'];
  icon1: ActionButtonProps['icon'];
  href1: ActionButtonProps['href'];
  downloadActive1: ActionButtonProps['downloadActive'];
  cta2: ActionButtonProps['cta'];
  icon2: ActionButtonProps['icon'];
  href2: ActionButtonProps['href'];
  downloadActive2: ActionButtonProps['downloadActive'];
  cta3: ActionButtonProps['cta'];
  icon3: ActionButtonProps['icon'];
  href3: ActionButtonProps['href'];
  downloadActive3: ActionButtonProps['downloadActive'];
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
    resolver: zodResolver(ContactFormSchema),
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

  const isLoading = form.formState.isSubmitting;

  const { toast } = useToast();

  const onSubmit = async (data: z.infer<typeof ContactFormSchema>) => {
    try {
      // Sanitizer les données avant envoi
      const sanitizer = ClientSanitizationService.getInstance();
      const sanitizedData = sanitizer.sanitizeObject(data);

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sanitizedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Network response was not ok');
      }

      toast({
        title: 'Success sending the email',
        description: 'I will get back to you as soon as possible.',
        variant: 'default',
      });

      form.reset();
    } catch (error) {
      toast({
        title: 'Error sending the email',
        description: 'A problem occurred while sending the email.',
        variant: 'destructive',
      });

      console.error('Error sending the email', error);
    }
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
          <InputField
            control={control}
            name='name'
            errors={errors.name}
            label='Name and family name :'
            placeholder='John Doe'
          />
          <InputField
            control={control}
            errors={errors.phone}
            name='phone'
            label='Phone :'
            placeholder='0123456789'
          />
          <InputField
            control={control}
            errors={errors.email}
            name='email'
            label='Email :'
            placeholder='your@mail.com'
          />
          <EmailTypeField
            control={control}
            errors={errors.type}
            name='type'
            label='Type of email :'
          />
          <MessageField
            control={control}
            errors={errors.message}
            name='message'
            label='Message :'
            placeholder='Tell me more about your project...'
          />
          <ConsentField
            control={control}
            errors={errors.consent}
            name='consent'
            label='I agree to be contacted using the provided information.'
          />
          <FooterCard
            mailto={mailto}
            cta1={cta1}
            icon1={icon1}
            href1={href1}
            downloadActive1={downloadActive1}
            disabled1={isLoading ? true : false}
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
