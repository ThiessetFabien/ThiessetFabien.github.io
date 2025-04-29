/**
 * ContactCard Component
 *
 * A card component that displays contact information and a contact form.
 * The card includes a header with phone number and email address,
 * as well as a form that allows users to send messages to the specified email.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.className] - Optional CSS class to apply to the card container
 * @returns {JSX.Element} A styled contact card with information and form
 */
import { Card, CardContent } from '@src/lib/components/ui/card';
import { cn } from '@src/lib/utils';
import { cnPadding, cnPaddingX } from '@src/styles/boxModel.style';
import { cnFlexCenterY, cnFlexCol } from '@src/styles/flex.style';

import { ContactForm } from '../forms/ContactForm';

import { Header2Card } from './layouts.cards/Header2Card';

export const ContactCard: React.FC<{
  className?: string;
}> = ({ className }) => {
  return (
    <Card className={cn(className)}>
      <Header2Card
        title='06 10 92 09 74'
        description='thiessetfabienpro@gmail.com'
        className={cnPadding}
      />
      <CardContent
        className={cn(cnFlexCol, cnPaddingX, cnFlexCenterY, 'justify-center')}
      >
        <ContactForm mailto='thiessetfabienpro@gmail.com' />
      </CardContent>
    </Card>
  );
};
