import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { FooterCard } from '@/src/components/ui/cards/layouts.cards/FooterCard';
import { cn } from '@/src/lib/utils';
import type { FormSchema } from '@/src/schemas/contactForm.schema';
import { ContactFormSchema } from '@/src/schemas/contactForm.schema';
import { ClientSanitizationService } from '@/src/services/client-sanitize.service';
import { cnSmallGap } from '@/src/styles/boxModel.style';
import { cnFlexCol } from '@/src/styles/flex.style';
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
  mailto?: CardProps['mailto'];
  cta1?: ActionButtonProps['cta'];
  icon1?: IconName;
  href1?: ActionButtonProps['href'];
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
      <h2 id='contact-form-heading' className='sr-only'>
        Formulaire de contact
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn(className, cnFlexCol)}
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
            aria-required='true'
          />
          <InputField
            control={control}
            errors={errors.phone}
            name='phone'
            label='Phone :'
            placeholder='0123456789'
            aria-required='true'
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
            aria-required='true'
          />
          <FooterCard
            mailto={mailto}
            cta1={cta1}
            icon1={icon1 as IconName | undefined}
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
