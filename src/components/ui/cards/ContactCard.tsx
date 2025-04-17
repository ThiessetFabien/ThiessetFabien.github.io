import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/src/lib/components/ui/card';
import { cn } from '@/src/lib/utils';
import {
  cnPadding,
  cnSmallSpaceY,
  cnPaddingX,
} from '@/src/styles/boxModel.style';
import { cnFlexCol, cnFlexCenterY } from '@/src/styles/flex.style';
import { cnTitle3, cnDescription } from '@/src/styles/font.style';

import { ContactForm } from '../forms/ContactForm';

export const ContactCard: React.FC<{
  className?: string;
}> = ({ className }) => {
  return (
    <Card className={cn(className, cnFlexCol, cnFlexCenterY)}>
      <CardTitle
        className={cn(
          cnPadding,
          cnSmallSpaceY,
          cnTitle3,
          'hyphens-auto text-center'
        )}
        id='contact-form-heading'
      >
        Contactez-moi
        <CardDescription className={cn(cnDescription, 'm-auto max-w-[90%]')}>
          La passion est de l&apos;énergie. Ressentez la puissance qui vient se
          concentrer sur ce qui vous enthousiasme (Oprah Winfrey).
        </CardDescription>
      </CardTitle>
      <CardContent
        className={cn(
          'w-full max-w-[90%] flex-1 pb-0',
          cnPaddingX,
          cnFlexCenterY
        )}
      >
        <ContactForm />
      </CardContent>
    </Card>
  );
};
