'use client';

import React, { useEffect, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  capitalizeFirstLetterOfEachWord,
  capitalizeFirstLetterOfPhrase,
  formatSpecialWords,
} from '@utils/formatText.util';
import { Loader2 } from 'lucide-react';
import {
  findGitHubYearsOfActivity,
  findAllGitHubRepositories,
} from '@src/lib/fetch/github-stats';
import QRCodeComponent from '@src/components/ui/qrcode/QRCodeComponent';
import { Typewriter } from '@src/components/ui/animations/TypewriterText';
import {
  cnAutoWidthFullHeight,
  cnBigImage,
  cnBorder2,
  cnBorderBottom4,
  cnBorderRadiusFull,
  cnFlexCol,
  cnFlexFullCenter,
  cnGap,
  cnLittleTranslateSm,
  cnPadding,
  cnSizeAuto,
  cnSmallText,
  ResponsiveImage,
} from '@src/styles';
import { cn } from '@lib/utils';
import { ProfileImage } from '@src/components/ui/images/ProfileImage';
import { Avatar, AvatarFallback } from '@lib/components/ui/avatar';
import type { CardProps } from '@src/types/CardProps';
import { ActionButton } from '@src/components/ui/buttons/ActionButton';
import { Badge } from '@lib/components/ui/badge';
import { containerScale } from '@styles/variantsAnimation';
import { cnHoverShadowPrimary } from '@styles/hovers.style';
import { cnFlexCenterY } from '@styles/flex.style';
import { cnTitle3 } from '@styles/font.style';
import { SmallDot } from '@src/components/ui/dot/dot';
import type { ProjectProps } from '@src/types/ProjectProps';

export const ProjectCard = ({
  project,
  translate,
}: {
  project: ProjectProps;
  translate: MotionValue<number>;
}) => (
  <motion.div
    style={{
      x: translate,
    }}
    whileHover={{
      y: -20,
    }}
    key={project.title}
    className={cn(
      'group/project relative h-96 w-[30rem] flex-shrink-0 overflow-hidden rounded-lg',
      cnHoverShadowPrimary
    )}
  >
    {/* Image container with hover effects */}
    <div className='relative h-full w-full overflow-hidden'>
      <Image
        src={
          project.thumbnail.startsWith('/')
            ? project.thumbnail
            : `/${project.thumbnail}`
        }
        height='600'
        width='600'
        priority
        className='absolute inset-0 h-full w-full object-cover object-left-top transition-transform duration-500 ease-in-out group-hover/project:scale-105'
        alt={project.imageAlt || project.title}
      />

      {/* Dark overlay on hover */}
      <div className='pointer-events-none absolute inset-0 h-full w-full bg-black/20 opacity-0 transition-opacity duration-300 group-hover/project:opacity-100' />

      {/* Content overlay */}
      <div className='absolute inset-0 flex flex-col justify-between p-6'>
        {/* Top section with badges */}
        <div className='flex translate-y-4 transform flex-wrap gap-2 opacity-0 transition-all duration-300 group-hover/project:translate-y-0 group-hover/project:opacity-100'>
          {project.tags?.slice(0, 3).map((tag, index) => (
            <Badge
              key={index}
              variant='secondary'
              className='border-primary/20 bg-background/80 text-foreground backdrop-blur-sm transition-colors duration-200 hover:border-primary'
            >
              {capitalizeFirstLetterOfEachWord(formatSpecialWords(tag || ''))}
            </Badge>
          ))}
        </div>

        {/* Bottom section with title, description and actions */}
        <div className='text-white'>
          {/* Title */}
          <h2
            className={cn(
              cnTitle3,
              'mb-2 translate-y-4 transform font-bold text-white opacity-0 transition-all delay-75 duration-300 group-hover/project:translate-y-0 group-hover/project:opacity-100'
            )}
          >
            {capitalizeFirstLetterOfPhrase(formatSpecialWords(project?.title))}
          </h2>

          {/* Description */}
          <p
            className={cn(
              cnSmallText,
              'mb-4 line-clamp-3 translate-y-4 transform text-white/90 opacity-0 transition-all delay-100 duration-300 group-hover/project:translate-y-0 group-hover/project:opacity-100'
            )}
          >
            {capitalizeFirstLetterOfPhrase(
              formatSpecialWords(project.description)
            )}
          </p>

          {/* Learned skills section */}
          {project.learned &&
            Array.isArray(project.learned) &&
            project.learned.length > 0 && (
              <div className='mb-4 translate-y-4 transform opacity-0 transition-all delay-150 duration-300 group-hover/project:translate-y-0 group-hover/project:opacity-100'>
                <p className='mb-2 text-xs font-semibold text-white/80'>
                  Ce que j'ai appris :
                </p>
                <div className='space-y-1'>
                  {project.learned.slice(0, 2).map((skill, index) => (
                    <div
                      key={index}
                      className='flex items-start text-xs text-white/70'
                    >
                      <SmallDot
                        className='mr-2 mt-1 bg-primary'
                        aria-hidden='true'
                      />
                      <span className='flex-1'>
                        {capitalizeFirstLetterOfPhrase(
                          formatSpecialWords(skill)
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* Action buttons */}
          <div
            className={cn(
              cnFlexCenterY,
              'translate-y-4 transform gap-2 opacity-0 transition-all delay-200 duration-300 group-hover/project:translate-y-0 group-hover/project:opacity-100'
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
                  size='sm'
                  className={cn(
                    'border-primary/20 bg-primary/90 text-primary-foreground backdrop-blur-sm hover:bg-primary',
                    project.github ? 'rounded-l-full' : 'rounded-full'
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
                  size='sm'
                  type='button'
                  className={cn(
                    'border-secondary/20 bg-secondary/90 text-secondary-foreground backdrop-blur-sm hover:bg-secondary',
                    !project.website ? 'rounded-full' : 'rounded-r-full'
                  )}
                  aria-label={`Voir le code source du projet ${project.title}`}
                />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

// Interfaces
interface SuccessCountProps {
  cnLinkContainer: string;
  cnStatsDivContainer: string;
  cnStatsText: string;
  cnStatsTextSmall: string;
  cnStatsTitle: string;
  cnStatsBgShadow: string;
}

interface GitHubRepositoriesCountProps {
  username: string;
  cnLinkContainer: string;
  cnStatsDivContainer: string;
  cnStatsText: string;
  cnStatsTitle: string;
  cnStatsBgShadow: string;
  cnIconLoader?: string;
}

interface GitHubYearsActivityProps {
  username: string;
  cnLinkContainer: string;
  cnStatsDivContainer: string;
  cnStatsText: string;
  cnStatsTextSmall: string;
  cnStatsTitle: string;
  cnStatsBgShadow: string;
  cnIconLoader?: string;
}

// Composant pour afficher le nombre de succès
const SuccessCount: React.FC<SuccessCountProps> = ({
  cnLinkContainer,
  cnStatsDivContainer,
  cnStatsText,
  cnStatsTextSmall,
  cnStatsTitle,
  cnStatsBgShadow,
}) => (
  <Link
    href='https://www.humanitude.fr/les-benefices-de-la-demarche-humanitude-etudies-pendant-la-crise/'
    target='_blank'
    rel='noopener noreferrer'
    aria-label='Voir les certifications et labels de bientraitance - 3+ succès'
    className={cn(
      cnLinkContainer,
      cnStatsBgShadow,
      'group',
      'transition-all duration-300'
    )}
  >
    <div className={cn(cnStatsDivContainer, 'transition-colors duration-300')}>
      <span
        className={cn(
          cnStatsText,
          'transition-colors duration-300 group-hover:text-primary group-focus:text-primary'
        )}
        aria-label='3 certifications obtenues'
      >
        3+
      </span>
      <span
        className={cn(
          cnStatsTextSmall,
          'transition-colors duration-300 group-hover:text-primary/80 group-focus:text-primary/80'
        )}
      >
        Label de bientraitance
      </span>
      <span
        className={cn(
          cnStatsTextSmall,
          'transition-colors duration-300 group-hover:text-primary/80 group-focus:text-primary/80'
        )}
      >
        RNCP 37674
      </span>
      <h3
        className={cn(
          cnStatsTitle,
          'transition-colors duration-300 group-hover:text-primary/70 group-focus:text-primary/70'
        )}
      >
        Succès
      </h3>
    </div>
  </Link>
);

// Composant pour afficher le nombre de repositories GitHub
const GitHubRepositoriesCount: React.FC<GitHubRepositoriesCountProps> = ({
  username,
  cnLinkContainer,
  cnStatsDivContainer,
  cnStatsText,
  cnStatsTitle,
  cnIconLoader,
  cnStatsBgShadow,
}) => {
  const [repositories, setRepositories] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadRepositories = async () => {
      try {
        const repoCount = await findAllGitHubRepositories(username);
        setRepositories(repoCount);
      } catch (error) {
        console.error(
          'Erreur lors du chargement du nombre de repositories GitHub:',
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadRepositories();
  }, [username]);

  return (
    <Link
      href={`https://github.com/${username}?tab=repositories`}
      target='_blank'
      rel='noopener noreferrer'
      aria-label={`Voir les repositories GitHub de ${username} - ${repositories || 0}+ projets open-source`}
      className={cn(
        cnLinkContainer,
        cnStatsBgShadow,
        'group',
        'transition-all duration-300'
      )}
    >
      <div
        className={cn(cnStatsDivContainer, 'transition-colors duration-300')}
      >
        {loading ? (
          <Loader2
            className={cnIconLoader}
            aria-label='Chargement du nombre de repositories GitHub'
          />
        ) : (
          <p
            className={cn(
              cnStatsText,
              'transition-colors duration-300 group-hover:text-primary group-focus:text-primary'
            )}
            aria-label={`${repositories || 0} repositories GitHub`}
          >
            {repositories || 0}+
          </p>
        )}
        <h3
          className={cn(
            cnStatsTitle,
            'transition-colors duration-300 group-hover:text-primary/70 group-focus:text-primary/70'
          )}
        >
          Projets open-source
        </h3>
      </div>
    </Link>
  );
};

// Composant pour afficher les années d'activité GitHub
const GitHubYearsActivity: React.FC<GitHubYearsActivityProps> = ({
  username,
  cnLinkContainer,
  cnStatsDivContainer,
  cnStatsBgShadow,
  cnIconLoader,
  cnStatsText,
  cnStatsTextSmall,
  cnStatsTitle,
}) => {
  const [years, setYears] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadYears = async () => {
      try {
        const yearsOfActivity = await findGitHubYearsOfActivity(username);
        setYears(yearsOfActivity);
      } catch (error) {
        console.error(
          "Erreur lors du chargement des années d'activité GitHub:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadYears();
  }, [username]);

  return (
    <Link
      href={`https://github.com/${username}`}
      target='_blank'
      rel='noopener noreferrer'
      aria-label={`Voir le profil GitHub de ${username} - ${years || 0}+ années d'activité`}
      className={cn(
        cnLinkContainer,
        cnStatsBgShadow,
        'group',
        'transition-all duration-300'
      )}
    >
      <div
        className={cn(cnStatsDivContainer, 'transition-colors duration-300')}
      >
        {loading ? (
          <Loader2
            className={cnIconLoader}
            aria-label='Chargement des statistiques GitHub'
          />
        ) : (
          <>
            <span
              className={cn(
                cnStatsText,
                'transition-colors duration-300 group-hover:text-primary group-focus:text-primary'
              )}
              aria-label={`${years || 0} années d'activité sur GitHub`}
            >
              {years || 0}+
            </span>
            <span
              className={cn(
                cnStatsTextSmall,
                'transition-colors duration-300 group-hover:text-primary/80 group-focus:text-primary/80'
              )}
            >
              15+ médico-social
            </span>
          </>
        )}
        <h3
          className={cn(
            cnStatsTitle,
            'transition-colors duration-300 group-hover:text-primary/70 group-focus:text-primary/70'
          )}
        >
          Années d'activité
        </h3>
      </div>
    </Link>
  );
};

export const Header = ({
  name,
  familyName,
  expertises,
  description,
  imageSrc,
  imageAlt,
}: {
  name: string;
  familyName: string;
  expertises: string[];
  description: string;
  imageSrc: string;
  imageAlt: string;
}) => {
  const username = process.env.NEXT_PUBLIC_GITHUB_DEFAULT_USERNAME;

  const cnStatsBgShadow = `hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 border border-border/50 hover:border-primary/30`;

  const cnLinkContainer =
    'bg-gradient-to-br from-purple-500/10 to-blue-500/10 hover:from-purple-500/20 hover:to-blue-500/20 group relative block focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background rounded-none';

  const cnStatsDivContainer = cn(
    cnFlexFullCenter,
    cnFlexCol,
    cnPadding,
    'text-center'
  );
  const cnStatsText = `text-5xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300`;
  const cnStatsTextSmall = `text-sm text-muted-foreground group-hover:text-primary/80 transition-colors duration-300`;
  const cnStatsTitle = `text-lg font-semibold text-muted-foreground group-hover:text-primary/70 transition-colors duration-300`;

  const cnIconLoader = `h-12 w-12 animate-spin text-muted-foreground group-hover:text-primary/80 transition-colors duration-300`;

  const variantQRCode: {
    cornersType: 'dot' | 'square';
    size: number;
    className: string;
  } = {
    cornersType: 'square',
    size: 80,
    className: 'm-0 aspect-square shrink-0 p-0',
  };

  return (
    <div className='relative left-0 top-0 mx-auto w-full max-w-7xl px-4 py-20 lg:left-20 lg:px-0'>
      <div className='grid auto-rows-auto grid-cols-1 lg:grid-cols-2'>
        {/* Image en premier en mobile (order-1), à droite en desktop */}
        <div
          className={cn(
            cnFlexFullCenter,
            'order-1 md:col-span-1 md:row-span-2 lg:order-2'
          )}
        >
          {imageSrc && (
            <div
              className={cn(
                cnFlexFullCenter,
                cnAutoWidthFullHeight,
                'relative z-30',
                cnBigImage,
                cnBorderRadiusFull,
                'border-primary',
                cnBorder2
              )}
            >
              <div
                className={cn(
                  cnAutoWidthFullHeight,
                  'relative z-50',
                  cnBigImage,
                  cnBorderRadiusFull,
                  'border-primary',
                  cnBorderBottom4
                )}
              />
              <Avatar
                className={cn(
                  'over absolute z-0',
                  'scale-105 sm:scale-110',
                  '-top-2 sm:-top-3 md:-top-[18px]',
                  cnBigImage,
                  cnSizeAuto
                )}
              >
                <ProfileImage
                  src={imageSrc}
                  alt={imageAlt}
                  width={ResponsiveImage()}
                  height={ResponsiveImage()}
                  className={cn(
                    'relative overflow-hidden',
                    cnBorderRadiusFull,
                    cnSizeAuto,
                    cnLittleTranslateSm,
                    cnBigImage
                  )}
                />
                <AvatarFallback
                  className={cn(
                    cnSmallText,
                    'relative',
                    cnBorderRadiusFull,
                    cnSizeAuto,
                    cnLittleTranslateSm,
                    cnBigImage
                  )}
                >
                  Profile
                </AvatarFallback>
              </Avatar>
            </div>
          )}
        </div>

        {/* Titre en deuxième en mobile (order-2), à gauche en desktop */}
        <h1 className='order-2 col-span-1 row-span-1 mt-8 text-3xl font-bold md:order-1 md:text-7xl lg:mt-0 lg:whitespace-nowrap'>
          {name && capitalizeFirstLetterOfEachWord(name)}{' '}
          {familyName && familyName.toUpperCase()} <br />{' '}
          {expertises && expertises.length > 0 && (
            <Typewriter
              text={expertises.map((expertise) =>
                capitalizeFirstLetterOfEachWord(formatSpecialWords(expertise))
              )}
              cursor=' |'
              speed={100}
              deleteSpeed={50}
              loop
              className='font-sans text-xl font-semibold text-primary md:text-5xl lg:whitespace-nowrap'
            />
          )}
        </h1>

        {/* Description en troisième en mobile (order-3), en bas à gauche en desktop */}
        <p className='order-3 col-span-1 row-span-1 mt-8 max-w-2xl font-sans text-base text-muted-foreground md:order-3 md:text-xl'>
          {capitalizeFirstLetterOfPhrase(formatSpecialWords(description))}
        </p>
      </div>

      {/* Section des liens et QR codes organisée en grille */}
      <div className={cn('mt-12 grid grid-cols-1 font-sans md:grid-cols-4')}>
        {username && (
          <GitHubRepositoriesCount
            username={username}
            cnLinkContainer={cn(cnLinkContainer)}
            cnStatsDivContainer={cnStatsDivContainer}
            cnStatsText={cnStatsText}
            cnStatsTitle={cnStatsTitle}
            cnIconLoader={cnIconLoader}
            cnStatsBgShadow={cnStatsBgShadow}
          />
        )}
        {username && (
          <GitHubYearsActivity
            username={username}
            cnLinkContainer={cnLinkContainer}
            cnStatsDivContainer={cnStatsDivContainer}
            cnStatsText={cnStatsText}
            cnStatsTextSmall={cnStatsTextSmall}
            cnStatsTitle={cnStatsTitle}
            cnIconLoader={cnIconLoader}
            cnStatsBgShadow={cnStatsBgShadow}
          />
        )}
        <SuccessCount
          cnLinkContainer={cnLinkContainer}
          cnStatsDivContainer={cnStatsDivContainer}
          cnStatsText={cnStatsText}
          cnStatsTextSmall={cnStatsTextSmall}
          cnStatsTitle={cnStatsTitle}
          cnStatsBgShadow={cnStatsBgShadow}
        />
        {/* QR Codes pour les documents */}
        <div
          className={cn(
            cnLinkContainer,
            cnStatsBgShadow,
            cnStatsDivContainer,
            'group',
            'transition-all duration-300'
          )}
          role='region'
          aria-label='Documents téléchargeables - QR codes'
        >
          <div
            className={cn(cnFlexFullCenter, cnFlexCol, cnGap, 'text-center')}
          >
            <div className='flex w-full items-center justify-center gap-x-4'>
              <Link
                href='/documents/resume.pdf'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Télécharger mon CV (PDF) - Scanner le QR code ou cliquer'
                className={cn(
                  'group/qr relative flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-background',
                  'transition-all duration-300 hover:scale-110 focus:scale-110'
                )}
              >
                <QRCodeComponent
                  value='/documents/resume.pdf'
                  title='CV'
                  primaryColor='#3b82f6'
                  dotsType='classy-rounded'
                  {...variantQRCode}
                />
              </Link>
              <Link
                href='/documents/motivation-letter.pdf'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Télécharger ma lettre de motivation (PDF) - Scanner le QR code ou cliquer'
                className={cn(
                  'group/qr relative flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:ring-offset-2 focus:ring-offset-background',
                  'transition-all duration-300 hover:scale-110'
                )}
              >
                <QRCodeComponent
                  value='/documents/motivation-letter.pdf'
                  title='Motivation'
                  primaryColor='#f87c58'
                  dotsType='classy-rounded'
                  {...variantQRCode}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const HeroParallax = ({
  name,
  familyName,
  expertises,
  description,
  projects = [],
  imageSrc,
  imageAlt,
}: {
  name: string;
  familyName: string;
  expertises: string[];
  description: string;
  imageSrc: string;
  imageAlt: string;
  projects: CardProps['projects'];
}) => {
  // Diviser les projets en lignes, en s'assurant qu'il y a au moins quelques projets par ligne
  const safeProjects = projects || [];
  const firstRow = safeProjects.slice(0, 5);
  const secondRow = safeProjects.slice(5, 10);
  const thirdRow = safeProjects.slice(10, 15);

  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  // Réduire les valeurs de translation pour un effet plus subtil
  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );
  return (
    <div
      ref={ref}
      className='relative flex h-[300vh] flex-col self-auto overflow-hidden py-40 antialiased [perspective:1000px] [transform-style:preserve-3d]'
    >
      <Header
        name={name}
        familyName={familyName}
        expertises={expertises}
        description={description}
        imageSrc={imageSrc}
        imageAlt={imageAlt}
      />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className='relative overflow-x-hidden'
      >
        {/* Première ligne - mouvement vers la droite */}
        {firstRow.length > 0 && (
          <motion.div className='mb-20 flex min-w-max flex-row space-x-20 pl-4'>
            {firstRow.map((project) => (
              <ProjectCard
                project={project}
                translate={translateX}
                key={project.title}
              />
            ))}
          </motion.div>
        )}

        {/* Deuxième ligne - mouvement vers la gauche */}
        {secondRow.length > 0 && (
          <motion.div className='mb-20 flex min-w-max flex-row space-x-20 pr-4'>
            {secondRow.map((project) => (
              <ProjectCard
                project={project}
                translate={translateXReverse}
                key={project.title}
              />
            ))}
          </motion.div>
        )}

        {/* Troisième ligne - mouvement vers la droite */}
        {thirdRow.length > 0 && (
          <motion.div className='flex min-w-max flex-row space-x-20 pl-4'>
            {thirdRow.map((project) => (
              <ProjectCard
                project={project}
                translate={translateX}
                key={project.title}
              />
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
