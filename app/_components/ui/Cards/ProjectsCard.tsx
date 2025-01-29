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
import { cnBorder, cnBorderNone } from '@/styles/borderStyles';
import {
  cnGap,
  cnPadding,
  cnPaddingBottom,
  cnPaddingTop,
  cnPaddingX,
  cnPaddingY,
  cnSmallGap,
  cnSmallMarginRight,
  cnSmallPadding,
  cnSmallPaddingX,
  cnSmallSpaceX,
  cnSmallSpaceY,
  cnSpaceY,
} from '@/styles/boxModelStyles';
import { cnFlexBetweenX, cnFlexCol } from '@/styles/flexStyles';
import { cnParagraph, cnSmallText, cnTitle3 } from '@/styles/fontStyles';
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
            cnSmallPadding,
            cnSmallSpaceY,
            'rounded-none bg-popover',
            'col-span-1 xl:max-w-none'
          )}
        >
          <CardHeader className='p-0'>
            <CardTitle className={cn('flex min-h-fit items-center')}>
              <Tabs defaultValue={project.title} className='w-full'>
                <TabsList
                  className={cn(
                    'grid h-fit w-full',
                    project.file ? 'grid-cols-3' : 'grid-cols-2'
                  )}
                >
                  <TabsTrigger value={project.title} className='p-0'>
                    <a
                      href={
                        project.website
                          ? `${baseUrl}${project.website}`
                          : undefined
                      }
                      target='_blank'
                      rel='noreferrer noopener'
                    >
                      <p
                        className={cn(
                          'flex-row',
                          'gap-1',
                          project.website !== undefined
                            ? 'hover:text-accent hover:underline'
                            : '',
                          cnTitle3
                        )}
                      >
                        {capitalizeFirstLetterOfPhrase(
                          formatSpecialWords(project.title)
                        )}
                      </p>
                    </a>
                  </TabsTrigger>
                  <TabsTrigger value={project.github} className='p-0'>
                    <a
                      href={`${baseUrl}${project.github}`}
                      target='_blank'
                      rel='noreferrer noopener'
                    >
                      <p
                        className={cn(
                          cnFlexBetweenX,
                          'gap-1 hover:text-secondary hover:underline'
                        )}
                      >
                        <span>Code</span>
                      </p>
                    </a>
                  </TabsTrigger>
                  {project.file && (
                    <TabsTrigger value={project.file} className='p-0'>
                      <a href={`${project.file}`} target='_blank'>
                        <p
                          className={cn(
                            'gap-1 hover:text-secondary hover:underline'
                          )}
                        >
                          Spec.
                        </p>
                      </a>
                    </TabsTrigger>
                  )}
                </TabsList>
              </Tabs>
            </CardTitle>
            {project.imageSrc && project.imageAlt && (
              <figure className={cn(cnSizeFull)}>
                {!videoLoaded[projectIndex] && (
                  <Image
                    src={`/${project.imageSrc}`}
                    alt={project?.imageAlt}
                    width={590}
                    height={315}
                    priority
                    className='h-fit max-h-full min-h-fit min-w-full rounded-none object-cover object-center xl:min-h-full'
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
                    'max-h-full min-h-fit min-w-full rounded-none object-cover object-center xl:min-h-full',
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
          </CardHeader>
          <CardContent className={cn(cnParagraph, 'max-w-prose px-0 pb-0')}>
            <p>
              {capitalizeFirstLetterOfPhrase(
                formatSpecialWords(project.description)
              )}
            </p>
          </CardContent>
          <CardFooter className={cn('h-fit flex-wrap px-0 pb-0', cnSmallGap)}>
            {project.tags.map((tag, tagIndex) => (
              <Badge
                key={tagIndex}
                variant='outline'
                className={cn(
                  cnSmallText,
                  cnBorderNone,
                  'rounded-none p-0 font-light'
                )}
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
