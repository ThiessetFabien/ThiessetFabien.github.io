import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { FooterCard } from '@/src/components/ui/cards/layouts.cards/FooterCard';
import { menuItems } from '@/src/config/menuItems.config';
import { cn } from '@/src/lib/utils';
import type { FormSchema } from '@/src/schemas/contactForm.schema';
import { ContactFormSchema } from '@/src/schemas/contactForm.schema';
import { ClientSanitizationService } from '@/src/services/client-sanitize.service';
import { cnGap, cnSpaceY } from '@/src/styles/boxModel.style';
import { cnFlexCol } from '@/src/styles/flex.style';
import type { ActionButtonProps } from '@/src/types/ActionButtonProps';
import type { CompactMode } from '@/src/types/FormFieldProps';
import { IconName } from '@/src/types/IconNameProps';
import { Form } from '@lib/components/ui/form';
import { useToast } from '@lib/hooks/use-toast';
import { ConsentField } from '@src/components/ui/checkbox/ConsentField';
import { MessageField } from '@src/components/ui/textarea/TextAreaField';
import type { CardProps } from '@src/types/CardProps';
import { InputField } from '@ui/inputs/InputField';
import { EmailTypeField } from '@ui/radios/RadioField';

/**
 * Interface pour les props du composant ContactForm
 */
interface ContactFormProps extends CompactMode {
  downloadActive1?: ActionButtonProps['downloadActive'];
  cta2?: ActionButtonProps['cta'];
  icon2?: IconName;
  href2?: ActionButtonProps['href'];
  downloadActive2?: ActionButtonProps['downloadActive'];
  cta3?: ActionButtonProps['cta'];
  icon3?: IconName;
  href3?: ActionButtonProps['href'];
  downloadActive3?: ActionButtonProps['downloadActive'];
  className?: CardProps['className'];
  mailto?: string;
}

/**
 * A React functional component that renders a contact form with various input fields,
 * validation, and a footer card containing action buttons. The form is designed to
 * handle user input, validate it using Zod schema, and submit the data to a backend API.
 *
 * @component
 * @param {ContactFormProps} props - The props for the component
 * @returns {JSX.Element} The rendered contact form component.
 */
export const ContactForm: React.FC<ContactFormProps> = ({
  isCompact = false,
  mailto,
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
}): JSX.Element => {
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

  return (
    <Form {...form} aria-labelledby='contact-form-heading'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn('w-full', isCompact ? 'space-y-2' : cnSpaceY, cnFlexCol)}
      >
        <div
          className={cn('w-full', isCompact ? 'space-y-2' : cnGap, cnFlexCol)}
        >
          <InputField
            control={control}
            name='name'
            errors={errors}
            label='Nom prénom :'
            placeholder='Jean Dupont'
            aria-required='true'
            isCompact={isCompact}
          />
          <InputField
            control={control}
            errors={errors}
            name='phone'
            label='Téléphone direct :'
            placeholder='+33612345678'
            aria-required='true'
            isCompact={isCompact}
          />
          <InputField
            control={control}
            errors={errors}
            name='email'
            label='Adresse email :'
            placeholder='votre@mail.com'
            isCompact={isCompact}
          />
          <EmailTypeField
            control={control}
            errors={errors}
            name='type'
            label='Type de demande :'
            isCompact={isCompact}
          />
          <MessageField
            control={control}
            errors={errors}
            name='message'
            label='Message :'
            placeholder='Parlez-moi un peu de votre projet...'
            isCompact={isCompact}
          />
          <ConsentField
            control={control}
            errors={errors}
            name='consent'
            label="J'accepte d'être contacté(e) en utilisant les informations fournies."
            aria-required='true'
            isCompact={isCompact}
          />
          <FooterCard
            mailto={
              mailto || menuItems.find((item) => item.id === 'contact')?.href
            }
            cta1='envoyer votre demande'
            icon1={
              menuItems.find((item) => item.id === 'contact')?.icon as IconName
            }
            href1={menuItems.find((item) => item.id === 'contact')?.href}
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
            className={cn(
              'col-span-1 row-span-1 flex-none md:col-span-3',
              className
            )}
          />
        </div>
      </form>
    </Form>
  );
};
