import React from 'react';
import Image from 'next/image';
import {
  CardTitle,
  CardContent,
  CardDescription,
} from '@/lib/components/ui/card';
import { Separator } from '@/lib/components/ui/separator';
import { baseUrl } from '@/utils/constants/baseUrl';
import { Top3Technologies } from '@/types/CardProps';
/**
 * @file SkillsCard.tsx
 * @description This file exports a skills card component.
 */

/**
 * SkillsCard component.
 * @param {CardProps} props - The props for the component.
 * @returns {JSX.Element} The rendered SkillsCard component.
 */
export const SkillsCard: React.FC<{
  Top3Technologies;
}> = ({ top3Technologies }) => {
  return (
    <>
      <div className='mb-4 flex justify-center gap-4 md:mb-6 md:gap-6'>
        {top3Technologies.map((tech, index) => (
          <div key={index} className='flex flex-row'>
            <div className='flex flex-col'>
              <Image
                src={`${baseUrl}cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${tech.slug}.svg`}
                alt={tech.name}
                width={50}
                height={50}
                objectFit='contain'
                priority
                className='mb-4 md:mb-6'
              />
              <CardTitle className='font-caption text-base font-semibold leading-tight tracking-tight md:text-xl lg:text-xl'>
                {tech.name}
              </CardTitle>
              <p className='max-w-prose text-sm font-light leading-relaxed text-muted-foreground'>
                {tech.description}
              </p>
            </div>
            {index < top3Technologies.length - 1 && (
              <Separator className='h-full w-[1px]' />
            )}
          </div>
        ))}
      </div>
      <CardDescription className='pb-4 md:pb-6'>
        <p>And i currently use...</p>
      </CardDescription>
    </>
  );
};

export default SkillsCard;
