import { Card, CardContent } from '@src/lib/components/ui/card';
import { cn } from '@src/lib/utils';
import { cnPadding } from '@src/styles/boxModel.style';
import { cnFlexCenterY, cnFlexCol } from '@src/styles/flex.style';
import { cnSizeFull } from '@src/styles/size.style';

import { ContactForm } from '../forms/ContactForm';

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
        <p className='flex w-full flex-col items-center justify-center'>
          <a href='mailto:thiessetfabienpro@gmail.com' target='_blank'>
            <span className='block text-center'>
              thiessetfabienpro@gmail.com
            </span>
          </a>
          <a href='tel:+33610920974' target='_blank'>
            <span className='block text-center'>0610920974</span>
          </a>
        </p>
        <ContactForm
          mailto='thiessetfabienpro@gmail.com'
          downloadActive1={false}
          className=''
        />
      </CardContent>
    </Card>
  );
};
