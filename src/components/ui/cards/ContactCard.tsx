import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
} from '@src/lib/components/ui/card';
import { cn } from '@src/lib/utils';
import {
  cnSmallSpaceY,
  cnPaddingX,
  cnSmallPadding,
} from '@src/styles/boxModel.style';
import { cnFlexCenterY } from '@src/styles/flex.style';
import { cnTitle3, cnDescription } from '@src/styles/font.style';
import { useIsLg, useIsXl } from '@src/styles/mediaQueries.style';

import { ContactForm } from '../forms/ContactForm';

export const ContactCard: React.FC<{
  className?: string;
}> = ({ className }) => {
  const isLg = useIsLg();
  const isXl = useIsXl();

  return (
    <Card className={cn(className, 'h-full overflow-hidden')}>
      <CardTitle
        className={cn(
          cnSmallSpaceY,
          cnSmallPadding,
          cnTitle3,
          'hyphens-auto text-center'
        )}
        id='contact-form-heading'
      >
        Contactez-moi
        <CardDescription className={cn(cnDescription, 'm-auto')}>
          La simplicité se démarque, alors que la compléxité va se perdre
          inexorablement dans la foule <span className='mx-1'>•</span> K.
          Barnett
        </CardDescription>
      </CardTitle>
      <CardContent
        className={cn(
          'w-full max-w-[95%] flex-1',
          cnPaddingX,
          cnFlexCenterY,
          isLg && 'lg:!pt-2',
          isXl && 'xl:flex-grow'
        )}
      >
        <ContactForm isCompact={isLg} />
      </CardContent>
    </Card>
  );
};
