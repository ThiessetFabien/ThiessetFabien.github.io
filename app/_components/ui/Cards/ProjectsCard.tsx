import { Code, Link } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

import {
  capitalizeFirstLetterOfEachWord,
  capitalizeFirstLetterOfPhrase,
  formatSpecialWords,
} from '@/hooks/FormatText';
import { Badge } from '@/lib/components/ui/badge';
import {
  CardTitle,
  CardFooter,
  CardHeader,
  Card,
  CardContent,
} from '@/lib/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/lib/components/ui/tabs';
import { cn } from '@/lib/utils';
import { cnBorder } from '@/styles/borderStyles';
import {
  cnPaddingBottom,
  cnSmallPaddingX,
  cnSmallSpaceX,
} from '@/styles/boxModelStyles';
import { cnFlexBetweenX, cnFlexCol } from '@/styles/flexStyles';
import { cnParagraph, cnSmallText } from '@/styles/fontStyles';
import { cnSizeFull, cnSizeIcon } from '@/styles/sizeStyles';
import { CardProps } from '@/types/CardProps';
import { ActionButton } from '@/ui/Buttons/ActionButton';
import { baseUrl } from '@/utils/constants/baseUrl';
import { dynamicMarginBottom } from '@/utils/dynamicMarginBottom';

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
  const [videoLoaded, setVideoLoaded] = useState<boolean[]>([]);

  useEffect(() => {
    projects?.forEach((project, index) => {
      if (videoRefs.current[index] && project.title === 'casalink') {
        videoRefs.current[index]!.currentTime = 246;
      }
    });
  }, [projects]);

  const handleVideoLoaded = (index: number) => {
    setVideoLoaded((prev) => {
      const newLoaded = [...prev];
      newLoaded[index] = true;
      return newLoaded;
    });
  };

  return (
    <div className={className}>
      {projects?.map((project, projectIndex) => (
        <Card
          key={projectIndex}
          className={cn(
            cnFlexCol,
            cnBorder,
            dynamicMarginBottom(projectIndex),
            'col-span-1 min-w-full bg-popover',
            cnSizeFull
          )}
        >
          <CardHeader className='p-0'>
            {project.imageSrc && project.imageAlt && (
              <figure>
                {!videoLoaded[projectIndex] && (
                  <Image
                    src={`/${project.imageSrc}`}
                    alt={project?.imageAlt}
                    width={590}
                    height={315}
                    priority
                    className='sm:min-h-1/2 max-h-32 min-w-full rounded-t-xl object-cover sm:max-h-none'
                  />
                )}
                <video
                  ref={
                    project.title === 'casalink'
                      ? (el) => {
                          videoRefs.current[projectIndex] = el;
                        }
                      : null
                  }
                  onLoadedData={() => handleVideoLoaded(projectIndex)}
                  controls={project.title === 'casalink' ? true : false}
                  controlsList='nodownload'
                  autoPlay={project.title === 'casalink' ? false : true}
                  loop={project.title === 'casalink' ? false : true}
                  muted={project.title === 'casalink' ? false : true}
                  className={cn(
                    'sm:min-h-1/2 max-h-32 min-w-full rounded-t-xl object-cover sm:max-h-none',
                    videoLoaded[projectIndex] ? '' : 'hidden'
                  )}
                >
                  <track kind='captions' src={`videos/${project.videoSrc}`} />
                  <source src={`videos/${project.videoSrc}`} type='video/mp4' />
                  Your browser does not support the video tag.
                </video>
                <figcaption className='sr-only'>{project.imageAlt}</figcaption>
              </figure>
            )}
            <CardTitle
              className={cn(
                'flex items-center',
                cnPaddingBottom,
                cnSmallSpaceX
              )}
            >
              <Tabs defaultValue={project.title} className='w-full'>
                <TabsList
                  className={cn(
                    'grid w-full',
                    project.website ? 'grid-cols-2' : 'grid-cols-1'
                  )}
                >
                  <TabsTrigger value={project.title}>
                    <a
                      href={
                        project.website
                          ? `${baseUrl}${project.website}`
                          : `${baseUrl}${project.github}`
                      }
                      target='_blank'
                      rel='noreferrer noopener'
                    >
                      <p
                        className={cn(
                          'flex-row',
                          cnFlexBetweenX,
                          'gap-1 hover:underline'
                        )}
                      >
                        {!project.website ? (
                          <Code className={cnSizeIcon} />
                        ) : (
                          <Link className={cnSizeIcon} />
                        )}
                        <span>
                          {capitalizeFirstLetterOfPhrase(
                            project.website
                              ? project.title.toUpperCase()
                              : `repository of ${project.title.toUpperCase()}`
                          )}
                        </span>
                      </p>
                    </a>
                  </TabsTrigger>
                  {project.github && project.website && (
                    <TabsTrigger
                      value={project.website ? project.github : project.title}
                    >
                      <a
                        href={`${baseUrl}${project.github}`}
                        target='_blank'
                        rel='noreferrer noopener'
                      >
                        <p
                          className={cn(
                            'flex-row-reverse',
                            cnFlexBetweenX,
                            'gap-1 hover:underline'
                          )}
                        >
                          <span>Repository</span>
                          <Code size={14} />
                        </p>
                      </a>
                    </TabsTrigger>
                  )}
                </TabsList>
              </Tabs>
            </CardTitle>
          </CardHeader>
          <CardContent
            className={cn(
              cnParagraph,
              'flex-auto',
              cnFlexCol,
              'justify-between'
            )}
          >
            {capitalizeFirstLetterOfPhrase(
              formatSpecialWords(project.description)
            )}
            {project.file && (
              <ActionButton
                cta='See the specifications'
                icon='FileCog'
                href={`${project.file}`}
                variant='link'
                className={cn(cnSmallText, 'border-none pl-0')}
              />
            )}
          </CardContent>
          <CardFooter
            className={cn(
              cnFlexBetweenX,
              cnSmallPaddingX,
              cnPaddingBottom,
              'h-auto flex-wrap'
            )}
          >
            {project.tags.map((tag, tagIndex) => (
              <Badge
                key={tagIndex}
                variant='outline'
                className={cn('rounded-xl', cnSmallText, 'font-light')}
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
