import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useRef, useState, useCallback, memo } from 'react';

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
  cnMarginLeft,
  cnPadding,
  cnSmallGap,
  cnSmallSpaceY,
} from '@src/styles/boxModel.style';
import { cnFlexCol } from '@src/styles/flex.style';
import { cnParagraph, cnSmallText, cnTitle3 } from '@src/styles/font.style';
import { cnHoverShadowPrimary } from '@src/styles/hovers.style';
import {
  useIsXs,
  useIsXxs,
  useIsLg,
  useIsMd,
  useIsSm,
} from '@src/styles/mediaQueries.style';
import { cnSizeFull } from '@src/styles/size.style';
import { containerScale, mediaFade } from '@src/styles/variantsAnimation';
import { CardProps } from '@src/types/CardProps';
import {
  capitalizeFirstLetterOfEachWord,
  capitalizeFirstLetterOfPhrase,
  formatSpecialWords,
} from '@src/utils/formatText.util';
import { cnFlexCenterY } from '@styles/flex.style';

import { cnSpaceY } from '../../../styles/boxModel.style';
import { ActionButton } from '../buttons/ActionButton';
import { SmallDot } from '../dot/dot';

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
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([]);

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleCards, setVisibleCards] = useState<boolean[]>([]);
  const [visibleMediaIndices, setVisibleMediaIndices] = useState<Set<number>>(
    new Set()
  );

  // Use hooks to determine screen size
  const isLg = useIsLg();
  const isMd = useIsMd();
  const isSm = useIsSm();
  const isXs = useIsXs();
  const isXxs = useIsXxs();

  // Initialize states when projects change
  useEffect(() => {
    if (projects?.length) {
      setVideoLoaded(new Array(projects.length).fill(false));
      setImagesLoaded(new Array(projects.length).fill(false));
      setVisibleCards(new Array(projects.length).fill(false));
    }
  }, [projects]);

  // Memoized callbacks for performance optimization
  const handleVideoLoaded = useCallback((index: number) => {
    setVideoLoaded((prev) => {
      const newLoaded = [...prev];
      newLoaded[index] = true;
      return newLoaded;
    });
  }, []);

  const handleImageLoaded = useCallback((index: number) => {
    setImagesLoaded((prev) => {
      const newLoaded = [...prev];
      newLoaded[index] = true;
      return newLoaded;
    });
  }, []);

  // Observer to detect when cards enter the viewport
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

              // Mark the media as visible to load the video
              setVisibleMediaIndices((prev) => {
                const updated = new Set(prev);
                updated.add(index);
                return updated;
              });

              // Preload the image
              if (projects?.[index]?.imageSrc && !imagesLoaded[index]) {
                const img = new window.Image();
                img.src = projects[index].imageSrc.startsWith('/')
                  ? projects[index].imageSrc
                  : `/${projects[index].imageSrc}`;
                img.onload = () => handleImageLoaded(index);
              }
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '200px 0px' }
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
  }, [projects, imagesLoaded, handleImageLoaded]);

  // Specific configuration for Casalink project
  useEffect(() => {
    projects?.forEach((project, index) => {
      if (
        visibleMediaIndices.has(index) &&
        videoRefs.current[index] &&
        project.title === 'casalink'
      ) {
        videoRefs.current[index]!.currentTime = 246;
        videoRefs.current[index]!.controls = true;
        videoRefs.current[index]!.muted = false;
        videoRefs.current[index]!.preload = 'metadata';
      }
    });
  }, [projects, visibleMediaIndices]);

  // Create memoized refs for videos and cards
  const setVideoRef = useCallback(
    (el: HTMLVideoElement | null, index: number) => {
      videoRefs.current[index] = el;
    },
    []
  );

  const setCardRef = useCallback((el: HTMLDivElement | null, index: number) => {
    cardRefs.current[index] = el;
  }, []);

  // Memoized function to determine if a video should be loaded
  const shouldLoadVideo = useCallback(
    (index: number): boolean => {
      return visibleMediaIndices.has(index);
    },
    [visibleMediaIndices]
  );

  return (
    <div className={className}>
      {projects?.map((project, projectIndex) => (
        <ProjectCard
          key={projectIndex}
          project={project}
          projectIndex={projectIndex}
          isLg={isLg}
          isMd={isMd}
          isSm={isSm}
          isXs={isXs}
          isXxs={isXxs}
          setCardRef={setCardRef}
          setVideoRef={setVideoRef}
          handleVideoLoaded={handleVideoLoaded}
          handleImageLoaded={handleImageLoaded}
          videoLoaded={videoLoaded}
          visibleCards={visibleCards}
          visibleMediaIndices={visibleMediaIndices}
          shouldLoadVideo={shouldLoadVideo}
        />
      ))}
    </div>
  );
};

/**
 * ProjectCard component.
 * A memoized component that renders an individual project card.
 * It handles the display of project information, images, videos, and interactive UI elements.
 * The component is optimized to prevent unnecessary re-renders based on prop changes.
 */
const ProjectCard = memo(
  ({
    project,
    projectIndex,
    isLg,
    isMd,
    isSm,
    isXs,
    isXxs,
    setCardRef,
    setVideoRef,
    handleVideoLoaded,
    handleImageLoaded,
    videoLoaded,
    visibleCards,
    visibleMediaIndices,
    shouldLoadVideo,
  }: {
    project: NonNullable<CardProps['projects']>[number];
    projectIndex: number;
    isLg: boolean;
    isMd: boolean;
    isSm: boolean;
    isXs: boolean;
    isXxs: boolean;
    setCardRef: (el: HTMLDivElement | null, index: number) => void;
    setVideoRef: (el: HTMLVideoElement | null, index: number) => void;
    handleVideoLoaded: (index: number) => void;
    handleImageLoaded: (index: number) => void;
    videoLoaded: boolean[];
    visibleCards: boolean[];
    visibleMediaIndices: Set<number>;
    shouldLoadVideo: (index: number) => boolean;
  }) => {
    return (
      <div ref={(el) => setCardRef(el, projectIndex)} key={projectIndex}>
        <Card
          className={cn(
            cnFlexCol,
            cnBorder,
            cnPadding,
            cnSpaceY,
            cnSizeFull,
            'hover:popover group bg-popover/80',
            'col-span-1 xl:max-w-none',
            cnHoverShadowPrimary
          )}
          aria-labelledby={`project-title-${projectIndex}`}
        >
          {visibleCards[projectIndex] && (
            <CardHeader className='p-0'>
              {project.imageSrc && project.imageAlt && (
                <figure className='relative h-[220px] overflow-hidden rounded-md bg-muted'>
                  <AnimatePresence mode='sync'>
                    <motion.div
                      key={`image-${projectIndex}`}
                      variants={mediaFade}
                      initial='initial'
                      animate='animate'
                      className={cn(
                        'absolute inset-0 h-full w-full',
                        videoLoaded[projectIndex] && project.videoSrc
                          ? 'z-10'
                          : 'z-20'
                      )}
                    >
                      <Image
                        src={
                          project.imageSrc.startsWith('/')
                            ? project.imageSrc
                            : `/${project.imageSrc}`
                        }
                        alt={
                          project?.imageAlt ||
                          `Image du projet ${project.title}`
                        }
                        onLoad={() => handleImageLoaded(projectIndex)}
                        className='h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105'
                        priority={projectIndex < 2}
                        width={640}
                        height={220}
                        fetchPriority={projectIndex < 2 ? 'high' : 'auto'}
                        quality={90}
                        unoptimized={false}
                      />
                    </motion.div>

                    {project.videoSrc && shouldLoadVideo(projectIndex) && (
                      <motion.div
                        key={`video-${projectIndex}`}
                        variants={mediaFade}
                        initial='initial'
                        animate={
                          videoLoaded[projectIndex] ? 'animate' : 'initial'
                        }
                        className='absolute inset-0 z-30 h-full w-full'
                      >
                        <video
                          ref={(el) => setVideoRef(el, projectIndex)}
                          onLoadedData={() => handleVideoLoaded(projectIndex)}
                          onError={(e) =>
                            console.error(`Erreur vidéo (${project.title}):`, e)
                          }
                          controls={project.title === 'casalink'}
                          autoPlay={
                            project.title !== 'casalink'
                              ? visibleMediaIndices.has(projectIndex)
                              : false
                          }
                          loop={project.title !== 'casalink'}
                          muted={project.title !== 'casalink'}
                          playsInline
                          preload={projectIndex < 2 ? 'auto' : 'metadata'}
                          poster={
                            project.imageSrc.startsWith('/')
                              ? project.imageSrc
                              : `/${project.imageSrc}`
                          }
                          className='h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105'
                          aria-label={`Vidéo de démonstration du projet ${project.title}`}
                          width={640}
                          height={220}
                        >
                          <source
                            src={
                              project.videoSrc
                                ? project.videoSrc.startsWith('/')
                                  ? project.videoSrc
                                  : `/videos/${project.videoSrc}`
                                : ''
                            }
                            type='video/mp4'
                          />
                          <track
                            kind='captions'
                            src={undefined}
                            label='Français'
                            srcLang='fr'
                            default
                          />
                          Votre navigateur ne prend pas en charge la lecture
                          vidéo.
                        </video>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <figcaption className='sr-only'>
                    {capitalizeFirstLetterOfPhrase(
                      formatSpecialWords(project?.title)
                    )}
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
              className={cn(
                cnTitle3,
                'relative flex min-h-fit',
                isLg ? 'items-center' : 'flex-row items-center justify-between',
                (isXs || isSm) && 'flex-col items-start gap-2'
              )}
            >
              <div
                className={cn(
                  'flex items-center',
                  isXs ? 'w-full' : 'flex-shrink'
                )}
                id={`project-title-${projectIndex}`}
              >
                {capitalizeFirstLetterOfPhrase(
                  formatSpecialWords(project?.title)
                )}
                {project?.title === 'anitapp' ? (
                  <Badge
                    variant='outline'
                    className={cn(cnMarginLeft, 'rounded-full')}
                  >
                    En cours
                  </Badge>
                ) : null}
              </div>
              <div
                className={cn(
                  'z-40 transition-all duration-300 ease-in-out',
                  isLg
                    ? 'absolute bottom-0 left-0 right-0 w-full translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:transform group-hover:opacity-100'
                    : 'static w-auto flex-shrink-0 opacity-100'
                )}
              >
                <div
                  className={cn(
                    cnFlexCenterY,
                    'gap-x-1',
                    isLg ? 'w-full justify-end' : 'justify-end',
                    isXs && 'w-full justify-center'
                  )}
                >
                  {project.website && (
                    <motion.div
                      variants={containerScale}
                      whileHover='hover'
                      whileTap='tap'
                    >
                      <ActionButton
                        cta='démo'
                        href={project.website}
                        type='button'
                        size={isXs ? 'xs' : isLg ? 'default' : 'sm'}
                        className={cn(
                          project.github || project.file
                            ? 'rounded-l-full'
                            : 'rounded-full',
                          isXs && 'text-xs',
                          isXs && (isXxs ? 'px-1' : 'px-2'),
                          !isXs && !isMd && !isLg && 'px-3 text-sm'
                        )}
                        aria-label={`Voir la démo du projet ${project.title}`}
                      />
                    </motion.div>
                  )}
                  {project.github && (
                    <motion.div
                      variants={containerScale}
                      whileHover='hover'
                      whileTap='tap'
                    >
                      <ActionButton
                        variant='secondary'
                        cta='code'
                        href={project.github}
                        type='button'
                        size={isXs ? 'xs' : isLg ? 'default' : 'sm'}
                        className={cn(
                          project.file ? 'rounded-none' : 'rounded-r-full',
                          project.website ? 'rounded-l-none' : 'rounded-l-full',
                          isXs && 'text-xs',
                          isXs && (isXxs ? 'px-1' : 'px-2'),
                          !isXs && !isMd && !isLg && 'px-3 text-sm'
                        )}
                        aria-label={`Voir le code source du projet ${project.title}`}
                      />
                    </motion.div>
                  )}
                  {project.file && (
                    <motion.div
                      variants={containerScale}
                      whileHover='hover'
                      whileTap='tap'
                    >
                      <ActionButton
                        variant='secondary'
                        cta={
                          isXs
                            ? isXxs
                              ? 'Docs'
                              : 'Specs'
                            : isLg
                              ? 'Spécifications'
                              : 'Specs'
                        }
                        href={project.file}
                        type='button'
                        size={isXs ? 'xs' : isLg ? 'default' : 'sm'}
                        className={cn(
                          'rounded-r-full',
                          isXs && 'text-xs',
                          isXs && (isXxs ? 'px-1' : 'px-2'),
                          !isXs && !isMd && !isLg && 'px-3 text-sm'
                        )}
                        aria-label={`Consulter les spécifications du projet ${project.title}`}
                      />
                    </motion.div>
                  )}
                </div>
              </div>
            </CardTitle>{' '}
            <p className={cn(cnFlexCol, cnSmallText, cnSmallGap)}>
              <span>
                {capitalizeFirstLetterOfPhrase(
                  formatSpecialWords(project.description)
                )}
              </span>
            </p>
            <ul
              className={cn(cnSmallText, 'font-semibold')}
              aria-label={`Compétences acquises sur le projet ${project.title}`}
            >
              Ce que j&apos;ai appris :
              {project.learned &&
                Array.isArray(project.learned) &&
                project.learned.map((learned: string, index: number) => (
                  <li key={index} className='flex text-xs font-normal'>
                    <SmallDot className='bg-ring' aria-hidden='true' />
                    {capitalizeFirstLetterOfPhrase(formatSpecialWords(learned))}
                    {index < project.learned.length - 1 ? ';' : '.'}
                  </li>
                ))}
            </ul>
          </CardContent>
          <CardFooter className={cn('flex h-fit flex-col p-0', cnSmallSpaceY)}>
            <div
              className={cn(
                cnSizeFull,
                'flex flex-wrap gap-x-0.5 border-t group-hover:border-primary'
              )}
              role='list'
              aria-label={`Technologies utilisées pour ${project.title}`}
            >
              {project.tags.map((tag, tagIndex: number) => (
                <Badge
                  key={tagIndex}
                  variant='outline'
                  className={cn('border-none p-0.5 text-xs font-light')}
                  role='listitem'
                >
                  <p>
                    {capitalizeFirstLetterOfEachWord(
                      formatSpecialWords(typeof tag === 'string' ? tag : '')
                    )}
                  </p>
                </Badge>
              ))}
            </div>
          </CardFooter>
        </Card>
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Custom implementation to compare props and avoid unnecessary re-renders
    if (prevProps.projectIndex !== nextProps.projectIndex) return false;
    if (prevProps.isLg !== nextProps.isLg) return false;
    if (prevProps.isMd !== nextProps.isMd) return false;
    if (prevProps.isSm !== nextProps.isSm) return false;
    if (prevProps.isXs !== nextProps.isXs) return false;
    if (prevProps.isXxs !== nextProps.isXxs) return false;

    // Check for state changes
    if (
      prevProps.videoLoaded[prevProps.projectIndex] !==
      nextProps.videoLoaded[nextProps.projectIndex]
    )
      return false;
    if (
      prevProps.visibleCards[prevProps.projectIndex] !==
      nextProps.visibleCards[prevProps.projectIndex]
    )
      return false;

    // Check for media visibility changes
    const wasVisible = prevProps.visibleMediaIndices.has(
      prevProps.projectIndex
    );
    const isNowVisible = nextProps.visibleMediaIndices.has(
      nextProps.projectIndex
    );
    if (wasVisible !== isNowVisible) return false;

    // If no changes detected, don't re-render
    return true;
  }
);

// Display name for React DevTools
ProjectCard.displayName = 'ProjectCard';
