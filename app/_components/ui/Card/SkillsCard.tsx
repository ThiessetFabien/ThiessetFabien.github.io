import React from 'react';
import Image from 'next/image';
import { CardTitle, CardDescription } from '@/lib/components/ui/card';
import { Separator } from '@/lib/components/ui/separator';
import { baseUrl } from '@/utils/constants/baseUrl';
import { cn } from '@/lib/utils';
import { Top3Technologies } from '@/types/Top3TechnologieProps';
import { cnTitle2, cnParagraph, cnDescription } from '@/styles/fontStyles';
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
  top3Technologies: Top3Technologies[];
}> = ({ top3Technologies }) => {
  return (
    <>
      <div
        className={cn(
          'flex justify-center',
          'mb-4 gap-4 md:mb-6 md:gap-6 lg:block'
        )}
      >
        {top3Technologies.map((tech, index) => (
          <div
            key={index}
            className={cn(
              'flex w-1/3 flex-row gap-4',
              'md:w-full',
              'lg:flex-col'
            )}
          >
            <div className='flex flex-col'>
              <Image
                src={`${baseUrl}cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${tech.slug}.svg`}
                alt={tech.name}
                width={50}
                height={50}
                objectFit='contain'
                className='mb-4'
                priority
              />
              <CardTitle className={cnTitle2}>{tech.name}</CardTitle>
              <p className={cnParagraph}>{tech.description}</p>
            </div>
            {index < top3Technologies.length - 1 && (
              <Separator className='h-full w-[1px]' />
            )}
          </div>
        ))}
      </div>
      <CardDescription className='pb-4 md:pb-6'>
        <p className={cnDescription}>And i currently use...</p>
      </CardDescription>
    </>
  );
};

export default SkillsCard;
