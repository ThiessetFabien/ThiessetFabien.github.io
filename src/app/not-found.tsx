'use client';

import { cnFlexCol, cnFlexFullCenter } from '@/src/styles/flex.style';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@lib/components/ui/card';
import { cnFlexCenterY } from '@styles/flex.style';

import { ActionButton } from '../components/ui/buttons/ActionButton';
import { cn } from '../lib/utils';
import { cnBigDescription, cnTitle1 } from '../styles/font.style';

export default function NotFound() {
  return (
    <main
      className={cn(
        cnFlexCol,
        cnFlexFullCenter,
        'col-span-12 my-auto h-full min-h-[80dvh] w-full'
      )}
    >
      <Card className={cn(cnFlexCol, 'justify-center')}>
        <CardHeader className='max-h-[10vh] w-full'>
          <h1 className={cn(cnTitle1, 'text-2xl font-bold')}>
            Error 404 : Not Found
          </h1>
        </CardHeader>
        <CardContent className={cn(cnFlexCenterY)}>
          <p className={cn(cnBigDescription)}>
            This page could not be found. Please check the URL or go back to the
            homepage.
          </p>
        </CardContent>
        <CardFooter className={'max-h-[10vh]'}>
          <ActionButton
            href='/'
            cta='Go back to the homepage'
            variant={'default'}
          />
        </CardFooter>
      </Card>
    </main>
  );
}
