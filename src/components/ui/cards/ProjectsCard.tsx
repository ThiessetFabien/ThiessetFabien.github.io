import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

import { Badge } from '@lib/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@lib/components/ui/card';
import { cn } from '@lib/utils';
import { cnBorder } from '@src/styles/border.style';
import {
  cnSmallGap,
  cnSmallPadding,
  cnSmallSpaceY,
} from '@src/styles/boxModel.style';
import { cnFlexCol } from '@src/styles/flex.style';
import { cnParagraph, cnSmallText, cnTitle3 } from '@src/styles/font.style';
import { cnSizeFull } from '@src/styles/size.style';
import { CardProps } from '@src/types/CardProps';
import {
  capitalizeFirstLetterOfEachWord,
  capitalizeFirstLetterOfPhrase,
  formatSpecialWords,
} from '@src/utils/formatText.util';
import { shimmer } from '@src/utils/shimmer';
import { toBase64 } from '@src/utils/toBase64';
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

    const currentRefs = cardRefs.current;

    currentRefs.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      currentRefs.forEach((ref) => {
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
            scale: [null, 1.01, 1.05],
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
                        width={300}
                        height={300}
                        loading={
                          project.title === 'casalink api' ? 'eager' : 'lazy'
                        }
                        quality={80}
                        placeholder='blur'
                        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(300, 300))}`}
                        priority={project.title === 'casalink api'}
                        className='h-fit max-h-full min-h-fit w-fit min-w-full rounded-xl object-cover object-center lg:max-h-[232.61px] xl:max-h-[160.88px] xl:min-h-full'
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
                        'max-h-full min-h-fit min-w-full rounded-xl object-cover object-center lg:max-h-[232.61px] xl:max-h-[160.88px] xl:min-h-full',
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
              <p className={cn(cnFlexCol, cnSmallText, cnSmallGap)}>
                <span>
                  {capitalizeFirstLetterOfPhrase(
                    formatSpecialWords(project.description)
                  )}
                </span>
              </p>
              <ul className={cn(cnSmallText, 'font-semibold')}>
                Ce que j&apos;ai appris :
                {project.learned &&
                  Array.isArray(project.learned) &&
                  project.learned.map((learned, index) => (
                    <li key={index} className='flex text-xs font-normal'>
                      <div className='mr-2 aspect-square h-2 w-2 flex-shrink-0 translate-y-1 rounded-full bg-ring'></div>
                      {capitalizeFirstLetterOfPhrase(
                        formatSpecialWords(learned)
                      )}
                      {index < project.learned.length - 1 ? ';' : '.'}
                    </li>
                  ))}
              </ul>
            </CardContent>
            <CardFooter
              className={cn('flex h-fit flex-col p-0', cnSmallSpaceY)}
            >
              <div
                className={cn(
                  cnSizeFull,
                  'flex flex-wrap gap-x-0.5 border-t border-primary'
                )}
              >
                {project.tags.map((tag, tagIndex) => (
                  <Badge
                    key={tagIndex}
                    variant='outline'
                    className={cn('border-none p-0.5 text-xs font-light')}
                  >
                    <p>
                      {capitalizeFirstLetterOfEachWord(
                        formatSpecialWords(`${tag}`)
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
                      cta='Démo'
                      href={project.website}
                      type='button'
                    />
                  </motion.div>
                )}
                {project.github && (
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.8 }}
                  >
                    <ActionButton
                      cta='code'
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
                      cta='Spécifications'
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
