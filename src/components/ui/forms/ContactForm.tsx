import { zodResolver } from '@hookform/resolvers/zod';
import { useId } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { CardContent } from '@src/lib/components/ui/card';
import { Form } from '@lib/components/ui/form';
import { useToast } from '@lib/hooks/use-toast';
import { Header2Card } from '@src/components/ui/cards/layouts.cards/Header2Card';
import { FooterCard } from '@src/components/ui/cards/layouts.cards/FooterCard';
import { ConsentField } from '@src/components/ui/checkbox/ConsentField';
import { MessageField } from '@src/components/ui/textarea/TextAreaField';
import { menuItems } from '@src/config/menuItems.config';
import { cn } from '@src/lib/utils';
import type { FormSchema } from '@src/schemas/contactForm.schema';
import { ContactFormSchema } from '@src/schemas/contactForm.schema';
import {
  cnPadding,
  cnPaddingX,
  cnGap,
  cnSpaceY,
} from '@styles/boxModel.style';
import { cnFlexCol, cnFlexCenterY } from '@styles/flex.style';
import { useIsXl } from '@styles/mediaQueries.style';
import type { CardProps } from '@src/types/CardProps';
import type { IconName } from '@src/types/IconNameProps';
import { InputField } from '@src/components/ui/inputs/InputField';
import { EmailTypeField } from '@src/components/ui/radios/RadioField';

/**
 * ContactForm Component
 *
 * An integrated contact component that combines a header with contact information
 * and a fully functional contact form with validation. This component can be used
 * as a standalone section or within other layouts.
 *
 * @component
 * @param {object} props - Component props
 * @param {string} [props.className] - Optional CSS class to apply to the container
 * @param {string} [props.phone] - Phone number to display in the header
 * @param {string} [props.email] - Email address for contact and form submission
 * @param {boolean} [props.downloadActive1] - Flag to enable download functionality on the form button
 * @returns {JSX.Element} A styled contact component with header information and form
 */
export const ContactForm: React.FC<{
  className?: string;
  phone?: string;
  email?: string;
  downloadActive1?: CardProps['downloadActive1'];
}> = ({
  className,
  phone = '06 10 92 09 74',
  email = 'thiessetfabienpro@gmail.com',
  downloadActive1 = false,
}): JSX.Element => {
  const formId = useId();

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
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Network response was not ok');
      }

      toast({
        title: 'Message envoyé avec succès',
        description: 'Je vous recontacterai dès que possible.',
        variant: 'default',
      });

      form.reset();
    } catch (error) {
      toast({
        title: "Erreur lors de l'envoi du message",
        description: "Un problème est survenu lors de l'envoi de l'email.",
        variant: 'destructive',
      });

      console.error("Erreur lors de l'envoi de l'email", error);
    }
  };

  const isXl = useIsXl();

  return (
    <section className={cn(className)}>
      <Header2Card title={phone} description={email} className={cnPadding} />
      <CardContent
        className={cn(cnFlexCol, cnPaddingX, cnFlexCenterY, 'justify-center')}
      >
        <Form {...form} aria-labelledby='contact-form-heading'>
          <form
            id={`contact-form-${formId}`}
            name='contact-form'
            onSubmit={handleSubmit(onSubmit)}
            className={cn('w-full', cnGap, isXl && cnSpaceY, cnFlexCol)}
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
                email || menuItems.find((item) => item.id === 'contact')?.href
              }
              cta1='Parlons en...'
              icon1={
                menuItems.find((item) => item.id === 'contact')
                  ?.icon as IconName
              }
              href1={menuItems.find((item) => item.id === 'contact')?.href}
              downloadActive1={downloadActive1}
              disabled1={!!isLoading}
              className='flex-none'
            />
          </form>
        </Form>
      </CardContent>
    </section>
  );
};
