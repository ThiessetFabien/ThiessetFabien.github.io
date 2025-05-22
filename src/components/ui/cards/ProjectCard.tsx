import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { memo } from 'react';

import { Badge } from '@lib/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@lib/components/ui/card';
import { cn } from '@lib/utils';
import { cnBorder } from '@styles/border.style';
import {
  cnMarginLeft,
  cnPadding,
  cnSmallGap,
  cnSmallSpaceY,
  cnSpaceY,
} from '@styles/boxModel.style';
import { cnFlexCol, cnFlexCenterY } from '@styles/flex.style';
import { cnParagraph, cnSmallText, cnTitle3 } from '@styles/font.style';
import { cnHoverShadowPrimary } from '@styles/hovers.style';
import { cnSizeFull } from '@styles/size.style';
import { containerScale, mediaFade } from '@styles/variantsAnimation';
import type { CardProps } from '@src/types/CardProps';
import {
  capitalizeFirstLetterOfEachWord,
  capitalizeFirstLetterOfPhrase,
  formatSpecialWords,
} from '@src/utils/formatText.util';

import { ActionButton } from '@src/components/ui/buttons/ActionButton';
import { SmallDot } from '@src/components/ui/dot/dot';

/**
 * ProjectCard component.
 * A memoized component that renders an individual project card.
 * It handles the display of project information, images, videos, and interactive UI elements.
 * The component is optimized to prevent unnecessary re-renders based on prop changes.
 */
export const ProjectCard = memo(
  ({
    project,
    projectIndex,
    isLg,
    isSm,
    isXs,
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
    isSm: boolean;
    isXs: boolean;
    setCardRef: (el: HTMLDivElement | null, index: number) => void;
    setVideoRef: (el: HTMLVideoElement | null, index: number) => void;
    handleVideoLoaded: (index: number) => void;
    handleImageLoaded: (index: number) => void;
    videoLoaded: boolean[];
    visibleCards: boolean[];
    visibleMediaIndices: Set<number>;
    shouldLoadVideo: (index: number) => boolean;
  }) => {
    // Fonction pour déterminer la source de la vidéo selon son format
    const getVideoSource = (videoSrc: string | undefined) => {
      if (!videoSrc) {
        return undefined;
      }

      if (videoSrc.startsWith('/')) {
        return videoSrc;
      }

      return `/videos/${videoSrc}`;
    };

    return (
      <Card
        ref={(el) => setCardRef(el, projectIndex)}
        key={projectIndex}
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
                        project?.imageAlt || `Image du projet ${project.title}`
                      }
                      onLoad={() => handleImageLoaded(projectIndex)}
                      className='w-full object-cover object-center transition-transform duration-500 ease-in-out group-hover:scale-105'
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
                        onError={(e) => {
                          console.error(`Erreur vidéo (${project.title}):`, e);
                          // Marquer la vidéo comme chargée même en cas d'erreur pour éviter de bloquer l'interface
                          handleVideoLoaded(projectIndex);
                        }}
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
                        className='w-full transition-transform duration-500 ease-in-out group-hover:scale-105'
                        style={{
                          objectFit: 'cover',
                          width: '100%',
                          height: '100%',
                        }}
                        aria-label={`Vidéo de démonstration du projet ${project.title}`}
                      >
                        <source
                          src={getVideoSource(project.videoSrc)}
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
          className={cn(cnParagraph, cnSpaceY, cnSizeFull, 'px-0 pb-0')}
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
                      href={project.website}
                      icon='ExternalLink'
                      type='button'
                      size='icon'
                      className={cn(
                        project.github || project.file
                          ? 'rounded-l-full'
                          : 'rounded-full'
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
                      icon='Github'
                      href={project.github}
                      size='icon'
                      type='button'
                      className={cn(
                        !project.website ? 'rounded-full' : 'rounded-r-full'
                      )}
                      aria-label={`Voir le code source du projet ${project.title}`}
                    />
                  </motion.div>
                )}
              </div>
            </div>
          </CardTitle>{' '}
          <p className={cn(cnFlexCol, cnSmallText, cnSmallGap)}>
            {capitalizeFirstLetterOfPhrase(
              formatSpecialWords(project.description)
            )}
          </p>
          <ul
            className={cn(cnSmallText, 'max-w-prose font-semibold')}
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
    );
  },
  (prevProps, nextProps) => {
    // Custom implementation to compare props and avoid unnecessary re-renders
    if (prevProps.projectIndex !== nextProps.projectIndex) return false;
    if (prevProps.isLg !== nextProps.isLg) return false;
    if (prevProps.isSm !== nextProps.isSm) return false;
    if (prevProps.isXs !== nextProps.isXs) return false;

    // Check for state changes
    if (
      prevProps.videoLoaded[prevProps.projectIndex] !==
      nextProps.videoLoaded[nextProps.projectIndex]
    )
      return false;
    if (
      prevProps.visibleCards[prevProps.projectIndex] !==
      nextProps.visibleCards[nextProps.projectIndex]
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

ProjectCard.displayName = 'ProjectCard';
