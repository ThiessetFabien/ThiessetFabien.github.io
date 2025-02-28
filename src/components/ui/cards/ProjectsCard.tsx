import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

import {
  capitalizeFirstLetterOfEachWord,
  capitalizeFirstLetterOfPhrase,
  formatSpecialWords,
} from '@/src/lib/utils/formatText.util';
import { cnBorder } from '@/src/styles/border.style';
import {
  cnSmallGap,
  cnSmallPadding,
  cnSmallSpaceY,
} from '@/src/styles/boxModel.style';
import { cnFlexCol } from '@/src/styles/flex.style';
import { cnParagraph, cnSmallText, cnTitle3 } from '@/src/styles/font.style';
import { cnSizeFull } from '@/src/styles/size.style';
import { Badge } from '@lib/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@lib/components/ui/card';
import { cn } from '@lib/utils';
import { CardProps } from '@src/types/CardProps';
import { cnFlexCenterY } from '@styles/flex.style';
import { cnSpaceY } from '../../../styles/boxModel.style';
import { ActionButton } from '../buttons/ActionButton';

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
        <motion.div
          whileHover={{
            scale: [null, 1.05, 1.1],
            transition: {
              duration: 0.2,
              times: [0, 0.6, 1],
              ease: ['easeInOut', 'easeOut'],
            },
          }}
          transition={{
            duration: 0.3,
            ease: 'easeOut',
          }}
          key={projectIndex}
        >
          <Card
            className={cn(
              cnFlexCol,
              cnBorder,
              cnSmallPadding,
              cnSpaceY,
              cnSizeFull,
              'bg-popover',
              'col-span-1 xl:max-w-none'
            )}
          >
            <CardHeader className='p-0'>
              {project.imageSrc && project.imageAlt && (
                <figure className={cn(cnSizeFull)}>
                  {!videoLoaded[projectIndex] && (
                    <Image
                      src={`/${project.imageSrc}`}
                      alt={project?.imageAlt}
                      width={590}
                      height={315}
                      loading='lazy'
                      className='h-fit max-h-full min-h-fit min-w-full rounded-xl object-cover object-center xl:min-h-full'
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
                      'max-h-full min-h-fit min-w-full rounded-xl object-cover object-center xl:min-h-full',
                      videoLoaded[projectIndex] ? '' : 'hidden'
                    )}
                  >
                    <track kind='captions' src={`videos/${project.videoSrc}`} />
                    <source
                      src={`videos/${project.videoSrc}`}
                      type='video/mp4'
                    />
                    Your browser does not support the video tag.
                  </video>
                  <figcaption className='sr-only'>
                    {project.imageAlt}
                  </figcaption>
                </figure>
              )}
            </CardHeader>
            <CardContent
              className={cn(
                cnParagraph,
                cnSpaceY,
                cnSizeFull,
                'max-w-prose px-0 pb-0'
              )}
            >
              <CardTitle
                className={cn(cnTitle3, 'flex min-h-fit items-center')}
              >
                {capitalizeFirstLetterOfPhrase(
                  formatSpecialWords(project?.title)
                )}
              </CardTitle>
              <p>
                {capitalizeFirstLetterOfPhrase(
                  formatSpecialWords(project.description)
                )}
              </p>
            </CardContent>
            <CardFooter
              className={cn('flex h-fit flex-col p-0', cnSmallSpaceY)}
            >
              <div className={cn(cnSizeFull, 'flex flex-wrap gap-1')}>
                {project.tags.map((tag, tagIndex) => (
                  <Badge
                    key={tagIndex}
                    variant='outline'
                    className={cn(cnSmallText, 'border-none p-0 font-light')}
                  >
                    <p>
                      {capitalizeFirstLetterOfEachWord(
                        formatSpecialWords(`#${tag}`)
                      )}
                    </p>
                  </Badge>
                ))}
              </div>
              <div className={cn(cnFlexCenterY, cnSmallGap, 'w-full')}>
                {project.website && (
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.8 }}
                  >
                    <ActionButton
                      cta='Site'
                      icon='ExternalLink'
                      href={project.website}
                      type='button'
                      variant='destructive'
                    />
                  </motion.div>
                )}
                {project.github && (
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.8 }}
                  >
                    <ActionButton
                      icon='Github'
                      href={project.github}
                      type='button'
                      variant='outline'
                    />
                  </motion.div>
                )}
                {project.file && (
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.8 }}
                  >
                    <ActionButton
                      icon='FileUser'
                      href={project.file}
                      type='button'
                      variant='outline'
                    />
                  </motion.div>
                )}
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};
