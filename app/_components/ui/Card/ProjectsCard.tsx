import React from 'react';
import Image from 'next/image';
import {
  CardTitle,
  CardDescription,
  CardFooter,
  CardHeader,
  Card,
} from '@/lib/components/ui/card';
import { Badge } from '@/lib/components/ui/badge';
import { cn } from '@/lib/utils';

import { dynamicMarginBottom } from '@/utils/dynamicMarginBottom';
import { baseUrl } from '@/utils/constants/baseUrl';
import { CardProps } from '@/types/CardProps';
import { cnBorder } from '@/styles/borderStyles';
import { cnFlexBetweenX, cnFlexCenterY, cnFlexCol } from '@/styles/flexStyles';
import { cnGap, cnPadding } from '@/styles/boxModelStyles';
import { cnParagraph, cnTitle2 } from '@/styles/fontStyles';
import { ActionButton } from '../CallToAction/ActionButton';

/**
 * @file CardProjects.tsx
 * @description This file exports a component that renders a list of project cards.
 */

/**
 * CardProjects component.
 * @param {Object} props - The props for the component.
 * @param {Projects[]} props.projects - An array of project objects to be displayed.
 * @param {string} [props.className] - Additional class names to apply to the component.
 * @returns {JSX.Element} The rendered CardProjects component.
 * @example
 * <CardProjects projects={projects} className="custom-class" />
 */

export const CardProjects: React.FC<{
  projects: CardProps['projects'];
  className?: string;
}> = ({ projects, className }) => {
  return (
    <div
      className={cn(
        className,
        cnGap,
        'h-full',
        'grid sm:auto-rows-auto sm:grid-cols-2 lg:grid-cols-3'
      )}
    >
      {projects &&
        projects.map((project, projectIndex) => (
          <Card
            key={projectIndex}
            className={cn(
              'container',
              cnFlexCol,
              cnBorder,
              dynamicMarginBottom(projectIndex),
              'col-span-1 h-full w-full min-w-full'
            )}
          >
            {project.imageSrc && project.imageAlt && (
              <Image
                src={`/${project.imageSrc}`}
                alt={project.imageAlt || ''}
                width={590}
                height={315}
                priority
                className='h-1/2 min-w-full rounded-t-lg object-cover'
              />
            )}
            {!project.imageSrc &&
              !project.imageAlt &&
              project.videoSrc &&
              !project.videoSrc.startsWith('https') && (
                <video
                  controls={false}
                  autoPlay={true}
                  loop={true}
                  muted
                  className='h-1/2 min-w-full rounded-t-lg object-cover'
                >
                  <source src={project.videoSrc} type='video/mp4' />
                </video>
              )}
            {!project.imageSrc &&
              !project.imageAlt &&
              project.videoSrc &&
              project.videoSrc.startsWith('https') && (
                <iframe
                  src={project.videoSrc}
                  allow='autoplay'
                  className='h-1/2 w-full rounded-t-lg object-cover'
                />
              )}

            <CardHeader className={cn(cnPadding, 'flex-1')}>
              <CardTitle className={cn(cnTitle2, cnFlexBetweenX)}>
                <ActionButton
                  cta={project.title}
                  icon='ExternalLink'
                  href={`${baseUrl}${project.website}`}
                  downloadActive={false}
                  variant='link'
                  size='icon'
                />
                <div>
                  {project.file && (
                    <ActionButton
                      icon='FileText'
                      href={`${project.file}`}
                      downloadActive={false}
                      variant='ghost'
                      size='icon'
                    />
                  )}
                  <ActionButton
                    icon='Github'
                    href={`${baseUrl}${project.github}`}
                    downloadActive={false}
                    variant='ghost'
                    size='icon'
                  />
                </div>
              </CardTitle>
              <CardDescription className={cnParagraph}>
                {project.organization}
              </CardDescription>
            </CardHeader>
            <CardFooter className={cn(cnFlexBetweenX, 'h-auto flex-wrap')}>
              {project.tags.map((tag, tagIndex) => (
                <Badge
                  key={tagIndex}
                  variant='outline'
                  className={'m-1 rounded-full font-light'}
                >
                  <p>{`${tag}`}</p>
                </Badge>
              ))}
            </CardFooter>
          </Card>
        ))}
    </div>
  );
};
