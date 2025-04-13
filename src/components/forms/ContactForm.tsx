import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { FooterCard } from '@/src/components/ui/cards/layouts.cards/FooterCard';
import { menuItems } from '@/src/config/menuItems.config';
import { cn } from '@/src/lib/utils';
import type { FormSchema } from '@/src/schemas/contactForm.schema';
import { ContactFormSchema } from '@/src/schemas/contactForm.schema';
import { ClientSanitizationService } from '@/src/services/client-sanitize.service';
import { cnGap, cnSmallGap, cnSpaceY } from '@/src/styles/boxModel.style';
import { cnFlexCol } from '@/src/styles/flex.style';
import { cnDescription, cnTitle3 } from '@/src/styles/font.style';
import type { ActionButtonProps } from '@/src/types/ActionButtonProps';
import { IconName } from '@/src/types/IconNameProps';
import { Form } from '@lib/components/ui/form';
import { useToast } from '@lib/hooks/use-toast';
import type { CardProps } from '@src/types/CardProps';
import { InputField } from '@ui/inputs/InputField';
import { EmailTypeField } from '@ui/radios/RadioField';

import { ConsentField } from '../ui/checkbox/ConsentField';
import { MessageField } from '../ui/textarea/TextAreaField';

/**
 * A React functional component that renders a contact form with various input fields,
 * validation, and a footer card containing action buttons. The form is designed to
 * handle user input, validate it using Zod schema, and submit the data to a backend API.
 *
 * @component
 * @param {Object} props - The props object.
 * @param {string} props.mailto - The email address to be used in the footer card.
 * @param {string} props.cta1 - The call-to-action text for the first button in the footer card.
 * @param {React.ReactNode} props.icon1 - The icon for the first button in the footer card.
 * @param {string} props.href1 - The URL for the first button in the footer card.
 * @param {boolean} props.downloadActive1 - Indicates if the first button in the footer card is a download link.
 * @param {string} props.cta2 - The call-to-action text for the second button in the footer card.
 * @param {React.ReactNode} props.icon2 - The icon for the second button in the footer card.
 * @param {string} props.href2 - The URL for the second button in the footer card.
 * @param {boolean} props.downloadActive2 - Indicates if the second button in the footer card is a download link.
 * @param {string} props.cta3 - The call-to-action text for the third button in the footer card.
 * @param {React.ReactNode} props.icon3 - The icon for the third button in the footer card.
 * @param {string} props.href3 - The URL for the third button in the footer card.
 * @param {boolean} props.downloadActive3 - Indicates if the third button in the footer card is a download link.
 * @param {string} props.className - Additional CSS class names for styling the form container.
 *
 * @returns {JSX.Element} The rendered contact form component.
 *
 * @example
 * <ContactForm
 *   mailto="example@mail.com"
 *   cta1="Download CV"
 *   icon1={<DownloadIcon />}
 *   href1="/cv.pdf"
 *   downloadActive1={true}
 *   cta2="Visit Portfolio"
 *   icon2={<PortfolioIcon />}
 *   href2="https://portfolio.example.com"
 *   downloadActive2={false}
 *   cta3="Contact Me"
 *   icon3={<ContactIcon />}
 *   href3="mailto:example@mail.com"
 *   downloadActive3={false}
 *   className="custom-class"
 * />
 */
export const ContactForm: React.FC<{
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
}> = ({
  downloadActive1,
  cta2,
  icon2,
  href2,
  downloadActive2,
  cta3,
  icon3,
  href3,
  downloadActive3,
}: {
  mailto?: string;
  cta1?: string;
  icon1?: IconName | undefined;
  href1?: string;
  downloadActive1?: boolean;
  cta2?: string;
  icon2?: IconName | undefined;
  href2?: string;
  downloadActive2?: boolean;
  cta3?: string;
  icon3?: IconName | undefined;
  href3?: string;
  downloadActive3?: boolean;
  className?: string;
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
      <div className={cn('w-full', cnSmallGap, cnFlexCol)}>
        <h3 id='contact-form-heading' className={cn(cnTitle3, 'text-center')}>
          Parlons de votre projet
        </h3>
        <p className={cn(cnDescription, 'mb-4 text-center')}>
          La passion est de l&apos;énergie. Ressentez la puissance qui vient se
          concentrer sur ce qui vous enthousiasme (Oprah Winfrey).
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn('w-full', cnSpaceY, cnFlexCol)}
      >
        <div className={cn('w-full', cnGap, cnFlexCol)}>
          <InputField
            control={control}
            name='name'
            errors={errors.name}
            label='Nom prénom :'
            placeholder='Jean Dupont'
            aria-required='true'
          />
          <InputField
            control={control}
            errors={errors.phone}
            name='phone'
            label='Téléphone direct :'
            placeholder='+33612345678'
            aria-required='true'
          />
          <InputField
            control={control}
            errors={errors.email}
            name='email'
            label='Adresse email :'
            placeholder='votre@mail.com'
          />
          <EmailTypeField
            control={control}
            errors={errors.type}
            name='type'
            label='Type de demande :'
          />
          <MessageField
            control={control}
            errors={errors.message}
            name='message'
            label='Message :'
            placeholder='Parlez-moi un peu de votre projet...'
          />
          <ConsentField
            control={control}
            errors={errors.consent}
            name='consent'
            label="J'accepte d'être contacté(e) en utilisant les informations fournies."
            aria-required='true'
          />
          <FooterCard
            mailto={menuItems.find((item) => item.id === 'contact')?.href}
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
            className='col-span-1 row-span-1 flex-none md:col-span-3'
          />
        </div>
      </form>
    </Form>
  );
};
