import { Card, CardContent } from '@src/lib/components/ui/card';
import { cn } from '@src/lib/utils';
import { cnPadding } from '@src/styles/boxModel.style';
import { cnFlexCenterY, cnFlexCol } from '@src/styles/flex.style';
import { cnSizeFull } from '@src/styles/size.style';

import { ContactForm } from '../forms/ContactForm';

import { Header2Card } from './layouts.cards/Header2Card';

export const ContactCard: React.FC<{
  className?: string;
}> = ({ className }) => {
  return (
    <Card className={cn(className)}>
      <CardContent
        className={cn(
          'flex-1',
          cnSizeFull,
          cnFlexCol,
          cnPadding,
          cnFlexCenterY,
          'justify-center'
        )}
      >
        <Header2Card
          title='06 10 92 09 74'
          description='thiessetfabienpro@gmail.com'
          className={cnPadding}
        />
        <ContactForm
          mailto='thiessetfabienpro@gmail.com'
          downloadActive1={false}
          className=''
        />
      </CardContent>
    </Card>
  );
};
