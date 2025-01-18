import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  CardTitle,
  CardDescription,
  CardFooter,
  CardHeader,
  Card,
  CardContent,
} from '@/lib/components/ui/card';
import { Badge } from '@/lib/components/ui/badge';
import { cn } from '@/lib/utils';

import { dynamicMarginBottom } from '@/utils/dynamicMarginBottom';
import { baseUrl } from '@/utils/constants/baseUrl';
import { CardProps } from '@/types/CardProps';
import { cnBorder } from '@/styles/borderStyles';
import { cnFlexBetweenX, cnFlexCol } from '@/styles/flexStyles';
import {
  cnPadding,
  cnPaddingBottom,
  cnPaddingX,
} from '@/styles/boxModelStyles';
import {
  capitalizeFirstLetterOfEachWord,
  capitalizeFirstLetterOfPhrase,
  formatSpecialWords,
  cnLightTextMuted,
  cnParagraph,
} from '@/styles/fontStyles';
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

export const ProjectsCard: React.FC<{
  projects: CardProps['projects'];
  className: CardProps['className'];
}> = ({ projects, className }) => {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    projects?.forEach((project, index) => {
      if (videoRefs.current[index] !== null && project.title === 'casalink') {
        videoRefs.current[index]!.currentTime = 246;
      }
    });
  }, [projects]);

  return (
    <div className={className}>
      {projects &&
        projects.map((project, projectIndex) => (
          <Card
            key={projectIndex}
            className={cn(
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
                className='min-h-1/2 min-w-full rounded-t-lg object-cover'
              />
            )}
            {!project.imageSrc && !project.imageAlt && project.videoSrc && (
              <video
                ref={
                  project.title === 'casalink'
                    ? (el) => {
                        videoRefs.current[projectIndex] = el;
                      }
                    : null
                }
                controls={project.title === 'casalink' ? true : false}
                controlsList='nodownload'
                autoPlay={project.title === 'casalink' ? false : true}
                width={590}
                height={315}
                loop={project.title === 'casalink' ? false : true}
                muted={project.title === 'casalink' ? false : true}
                className='min-h-1/2 h-auto min-w-full rounded-t-lg object-cover'
              >
                <source src={`videos/${project.videoSrc}`} type='video/mp4' />
              </video>
            )}
            <CardHeader className={cn(cnPadding, 'flex-1')}>
              <CardTitle
                className={cn(cnFlexBetweenX, 'text-primary', 'max-h-[4.5rem]')}
              >
                <ActionButton
                  cta={capitalizeFirstLetterOfPhrase(project.title)}
                  icon='ExternalLink'
                  href={
                    project.website ? `${project.website}` : `${project.github}`
                  }
                  variant='link'
                  className={'px-0'}
                />
                <div>
                  {project.file && (
                    <ActionButton
                      icon='FileText'
                      href={`${project.file}`}
                      variant='link'
                      className={'px-1'}
                    />
                  )}
                  {project.github && (
                    <ActionButton
                      icon='Github'
                      href={`${project.github}`}
                      variant='link'
                      className={'px-0'}
                    />
                  )}
                </div>
              </CardTitle>
              <CardDescription className={cnLightTextMuted}>
                {capitalizeFirstLetterOfEachWord(
                  formatSpecialWords(project.organization)
                )}
              </CardDescription>
              <CardContent className={cn(cnParagraph, 'p-0')}>
                {capitalizeFirstLetterOfPhrase(
                  formatSpecialWords(project.description)
                )}
              </CardContent>
            </CardHeader>
            <CardFooter
              className={cn(
                cnFlexBetweenX,
                cnPaddingX,
                cnPaddingBottom,
                'h-auto flex-wrap'
              )}
            >
              {project.tags.map((tag, tagIndex) => (
                <Badge
                  key={tagIndex}
                  variant='outline'
                  className={'rounded-full font-light'}
                >
                  <p>
                    {capitalizeFirstLetterOfEachWord(
                      formatSpecialWords(`${tag}`)
                    )}
                  </p>
                </Badge>
              ))}
            </CardFooter>
          </Card>
        ))}
    </div>
  );
};
