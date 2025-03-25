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

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

export const ProjectsCard: React.FC<{
  projects: CardProps['projects'];
  className: CardProps['className'];
}> = ({ projects, className }) => {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [videoLoaded, setVideoLoaded] = useState<boolean[]>([]);

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleCards, setVisibleCards] = useState<boolean[]>([]);

  useEffect(() => {
    projects?.forEach((project, index) => {
      if (videoRefs.current[index] && project.title === 'casalink') {
        videoRefs.current[index]!.currentTime = 246;
      }
    });
  }, [projects]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardRefs.current.findIndex(
              (ref) => ref === entry.target
            );
            if (index !== -1) {
              setVisibleCards((prev) => {
                const newVisible = [...prev];
                newVisible[index] = true;
                return newVisible;
              });
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      cardRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

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
          ref={(el) => {
            cardRefs.current[projectIndex] = el;
          }}
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
            {visibleCards[projectIndex] && (
              <CardHeader className='p-0'>
                {project.imageSrc && project.imageAlt && (
                  <figure className={cn(cnSizeFull)}>
                    {!videoLoaded[projectIndex] && (
                      <Image
                        src={`/${project.imageSrc}`}
                        alt={project?.imageAlt}
                        width={590}
                        height={315}
                        loading={
                          project.title === 'casalink api' ? 'eager' : 'lazy'
                        }
                        quality={80}
                        placeholder='blur'
                        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(590, 315))}`}
                        priority={project.title === 'casalink api'}
                        className='h-fit max-h-full min-h-fit w-fit min-w-full rounded-xl object-cover object-center xl:min-h-full'
                      />
                    )}
                    <video
                      ref={(el) => {
                        videoRefs.current[projectIndex] = el;
                      }}
                      onLoadedData={() => handleVideoLoaded(projectIndex)}
                      controls={project.title === 'casalink'}
                      controlsList='nodownload'
                      autoPlay={project.title !== 'casalink'}
                      loop={project.title !== 'casalink'}
                      muted={project.title !== 'casalink'}
                      preload={
                        project.title !== 'casalink' ? 'auto' : 'metadata'
                      }
                      poster={`/${project.imageSrc}`}
                      className={cn(
                        'max-h-full min-h-fit min-w-full rounded-xl object-cover object-center xl:min-h-full',
                        videoLoaded[projectIndex] ? '' : 'hidden'
                      )}
                    >
                      <track
                        kind='captions'
                        src={`/videos/${project.title}.vtt`}
                        srcLang='fr'
                        label='Sous-titres en français'
                        default
                      />
                      {project.videoSrc && (
                        <source
                          src={`videos/${project.videoSrc}`}
                          type='video/mp4'
                        />
                      )}
                      Your browser does not support the video tag.
                    </video>
                    <figcaption className='sr-only'>
                      {project.imageAlt}
                    </figcaption>
                  </figure>
                )}
              </CardHeader>
            )}
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
