import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Form } from '@lib/components/ui/form';
import { useToast } from '@lib/hooks/use-toast';
import { FooterCard } from '@src/components/ui/cards/layouts.cards/FooterCard';
import { ConsentField } from '@src/components/ui/checkbox/ConsentField';
import { MessageField } from '@src/components/ui/textarea/TextAreaField';
import { menuItems } from '@src/config/menuItems.config';
import { cn } from '@src/lib/utils';
import type { FormSchema } from '@src/schemas/contactForm.schema';
import { ContactFormSchema } from '@src/schemas/contactForm.schema';
import { ClientSanitizationService } from '@src/services/client-sanitize.service';
import { cnGap, cnSpaceY } from '@src/styles/boxModel.style';
import { cnFlexCol } from '@src/styles/flex.style';
import { useIsXl } from '@src/styles/mediaQueries.style';
import type { CardProps } from '@src/types/CardProps';
import { IconName } from '@src/types/IconNameProps';
import { InputField } from '@ui/inputs/InputField';
import { EmailTypeField } from '@ui/radios/RadioField';

/**
 * ContactForm Component
 *
 * A form component that handles contact submissions with validation, sanitization, and API integration.
 *
 * @component
 * @param {object} props - Component props
 * @param {string} props.mailto - Email address for the contact form submission
 * @param {boolean} props.downloadActive1 - Flag to enable download functionality on the first button
 * @param {string} props.className - Additional CSS classes for styling
 * @returns {JSX.Element} A fully functional contact form with validation
 */
export const ContactForm: React.FC<{
  mailto: CardProps['mailto'];
  downloadActive1?: CardProps['downloadActive1'];
  className?: CardProps['className'];
}> = ({ mailto, downloadActive1, className }): JSX.Element => {
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

  const isXl = useIsXl();

  return (
    <Form {...form} aria-labelledby='contact-form-heading'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn(className, 'w-full', cnGap, isXl && cnSpaceY, cnFlexCol)}
      >
        <InputField
          control={control}
          name='name'
          errors={errors}
          label='Nom prénom :'
          placeholder='Jean Dupont'
        />
        <InputField
          control={control}
          errors={errors}
          name='phone'
          label='Téléphone direct :'
          placeholder='+33612345678'
        />
        <InputField
          control={control}
          errors={errors}
          name='email'
          label='Adresse email :'
          placeholder='votre@mail.com'
        />
        <EmailTypeField
          control={control}
          errors={errors}
          name='type'
          label='Type de demande :'
        />
        <MessageField
          control={control}
          errors={errors}
          name='message'
          label='Message :'
          placeholder='Parlez-moi un peu de votre projet...'
        />
        <ConsentField
          control={control}
          errors={errors}
          name='consent'
          label="J'accepte d'être contacté(e) en utilisant les informations fournies."
        />
        <FooterCard
          mailto={
            mailto || menuItems.find((item) => item.id === 'contact')?.href
          }
          cta1='Parlons en...'
          icon1={
            menuItems.find((item) => item.id === 'contact')?.icon as IconName
          }
          href1={menuItems.find((item) => item.id === 'contact')?.href}
          downloadActive1={downloadActive1}
          disabled1={isLoading ? true : false}
          className='flex-none'
        />
      </form>
    </Form>
  );
};
