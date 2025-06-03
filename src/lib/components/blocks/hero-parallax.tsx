'use client';

import React, { useEffect, useRef, useState } from 'react';
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
  cnBigImage,
  cnFlexCol,
  cnFlexFullCenter,
  cnPadding,
} from '@src/styles';
import { cn } from '@lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@lib/components/ui/avatar';
import type { CardProps } from '@src/types/CardProps';
import { ActionButton } from '@src/components/ui/buttons/ActionButton';
import { Badge } from '@lib/components/ui/badge';
import { containerScale } from '@styles/variantsAnimation';
import { cnHoverShadowPrimary } from '@styles/hovers.style';
import { cnFlexCenterY } from '@styles/flex.style';
import { cnTitle3 } from '@styles/font.style';
import { SmallDot } from '@src/components/ui/dot/dot';
import type { ProjectProps } from '@src/types/ProjectProps';
import { useIsXs, useIsSm } from '@styles/mediaQueries.style';
import { IconCloud } from '@lib/components/ui/interactive-icon-cloud';

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
      'group/project relative flex-shrink-0 overflow-hidden',
      // Responsive: hauteur et largeur adaptées à chaque écran
      'h-64 w-64 sm:h-80 sm:w-80 md:h-96 md:w-[24rem] lg:w-[30rem]',
      cnHoverShadowPrimary
    )}
  >
    {/* Image container with hover effects - Semantic figure */}
    <figure className='relative h-full w-full overflow-hidden'>
      <Image
        src={
          project.thumbnail.startsWith('/')
            ? project.thumbnail
            : `/${project.thumbnail}`
        }
        height='600'
        width='600'
        priority
        className='absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 ease-in-out'
        alt={project.imageAlt || project.title}
      />

      {/* Dark overlay on hover */}
      <div className='pointer-events-none absolute inset-0 h-full w-full bg-card/80 opacity-0 transition-opacity duration-300 group-hover/project:opacity-100' />

      {/* Figcaption for accessibility - visually hidden but available to screen readers */}
      <figcaption className='sr-only'>
        {project.imageAlt || `Aperçu du projet ${project.title}`}
      </figcaption>

      {/* Content overlay */}
      <div className='absolute inset-0 mt-2 flex flex-col justify-between p-3 sm:p-4 md:p-6'>
        {/* Top section with badges */}
        <div className='flex transform flex-wrap gap-1 opacity-0 transition-all duration-300 group-hover/project:opacity-100'>
          {project.tags?.map((tag, index) => (
            <Badge
              key={index}
              variant='outline'
              className='backdrop-blur-sm transition-colors duration-200'
            >
              {capitalizeFirstLetterOfEachWord(formatSpecialWords(tag))}
            </Badge>
          ))}
        </div>

        {/* Bottom section with title, description and actions */}
        <div>
          {/* Title */}
          <h2
            className={cn(
              cnTitle3,
              'mb-2 translate-y-4 transform font-bold text-foreground opacity-0 transition-all delay-75 duration-300 group-hover/project:translate-y-0 group-hover/project:opacity-100'
            )}
          >
            {capitalizeFirstLetterOfPhrase(formatSpecialWords(project?.title))}
          </h2>

          {/* Description */}
          <p
            className={cn(
              'mb-4 line-clamp-3 translate-y-4 transform text-card-foreground/80 opacity-0 transition-all delay-100 duration-300 group-hover/project:translate-y-0 group-hover/project:opacity-100',
              // Responsive: taille de texte adaptée
              'text-xs sm:text-sm md:text-base'
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
              <div className='mb-4 translate-y-4 transform font-sans opacity-0 transition-all delay-150 duration-300 group-hover/project:translate-y-0 group-hover/project:opacity-100'>
                <p className='mb-2 text-xs font-semibold text-foreground/80'>
                  Ce que j'ai appris :
                </p>
                <div className='space-y-1'>
                  {project.learned.slice(0, 4).map((skill, index) => (
                    <div
                      key={index}
                      className='flex items-start text-xs text-foreground/70'
                    >
                      <SmallDot
                        className='mr-2 bg-primary'
                        aria-hidden='true'
                      />
                      <span className='flex-1'>
                        {capitalizeFirstLetterOfPhrase(
                          formatSpecialWords(skill)
                        )}
                        .
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
                  cta='Démo'
                  href={project.website}
                  icon='ExternalLink'
                  type='button'
                  size='sm'
                  className={cn(
                    'backdrop-blur-sm',
                    project.github ? 'rounded-l-full' : 'rounded-full'
                  )}
                  aria-label={`Voir la démo du projet ${project.title}`}
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
                  cta='Cahier des charges'
                  href={project.file}
                  icon='FileText'
                  type='button'
                  size='sm'
                  variant='outline'
                  className={cn(
                    'rounded-none backdrop-blur-sm',
                    !project.website && !project.github ? 'rounded-full' : ''
                  )}
                  aria-label={`Voir les fichiers du projet ${project.title}`}
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
                  cta='Code source'
                  icon='Github'
                  href={project.github}
                  size='sm'
                  variant='secondary'
                  type='button'
                  className={cn(
                    'backdrop-blur-sm',
                    !project.website ? 'rounded-full' : 'rounded-r-full'
                  )}
                  aria-label={`Voir le code source du projet ${project.title}`}
                />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </figure>
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
  <div className='group relative'>
    {/* Anneaux décoratifs subtils en rotation */}
    <div className='absolute inset-0 z-10 opacity-60'>
      <div className='absolute inset-2 animate-spin rounded-lg border border-dashed border-primary/10 [animation-duration:30s]' />
      <div className='border-secondary/8 absolute inset-4 animate-spin rounded-lg border border-dotted [animation-direction:reverse] [animation-duration:40s]' />
    </div>

    <Link
      href='https://www.humanitude.fr/les-benefices-de-la-demarche-humanitude-etudies-pendant-la-crise/'
      target='_blank'
      rel='noopener noreferrer'
      aria-label='Voir les certifications et labels de bientraitance - 3+ succès'
      className={cn(
        cnLinkContainer,
        cnStatsBgShadow,
        'group/link relative z-20',
        'transition-all duration-500',
        // Effets hover sophistiqués
        'hover:scale-105 hover:shadow-2xl hover:shadow-primary/25',
        'transform-gpu will-change-transform',
        // Indicateur de lien externe
        'after:absolute after:right-2 after:top-2 after:h-3 after:w-3 after:opacity-0',
        'after:transition-all after:duration-300 after:content-["↗"]',
        'after:text-primary/60 hover:after:opacity-100',
        // Effet de glow subtil
        'before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br',
        'before:from-primary/5 before:to-secondary/5 before:opacity-0',
        'before:transition-opacity before:duration-500 hover:before:opacity-100'
      )}
    >
      {/* Dark overlay matching project cards */}
      <div className='pointer-events-none absolute inset-0 h-full w-full bg-card/80 opacity-0 transition-opacity duration-300 group-hover/link:opacity-100' />

      <div
        className={cn(
          cnStatsDivContainer,
          'relative z-10 transition-colors duration-300'
        )}
      >
        {/* Particules décoratives */}
        <div className='absolute inset-0 overflow-hidden rounded-lg'>
          <div className='absolute left-3 top-3 h-1 w-1 animate-pulse rounded-full bg-green-500/40 [animation-delay:0s] [animation-duration:4s]' />
          <div className='absolute right-4 top-6 h-0.5 w-0.5 animate-pulse rounded-full bg-blue-500/40 [animation-delay:1.5s] [animation-duration:5s]' />
          <div className='absolute bottom-4 left-6 h-0.5 w-0.5 animate-pulse rounded-full bg-purple-500/40 [animation-delay:3s] [animation-duration:3.5s]' />
        </div>

        <span
          className={cn(
            cnStatsText,
            'relative transition-all duration-300',
            'group-hover/link:text-primary group-focus/link:text-primary',
            'transform-gpu group-hover/link:scale-110'
          )}
          aria-label='3 certifications obtenues'
        >
          3+
        </span>
        <span
          className={cn(
            cnStatsTextSmall,
            'transition-colors duration-300',
            'group-hover/link:text-primary/80 group-focus/link:text-primary/80'
          )}
        >
          Label de bientraitance
        </span>
        <span
          className={cn(
            cnStatsTextSmall,
            'transition-colors duration-300',
            'group-hover/link:text-primary/80 group-focus/link:text-primary/80'
          )}
        >
          RNCP 37674
        </span>
        <h3
          className={cn(
            cnStatsTitle,
            'transition-colors duration-300',
            'group-hover/link:text-primary/70 group-focus/link:text-primary/70'
          )}
        >
          Succès
        </h3>
      </div>
    </Link>
  </div>
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
    <div className='group relative'>
      {/* Anneaux décoratifs subtils en rotation */}
      <div className='absolute inset-0 z-10 opacity-60'>
        <div className='absolute inset-2 animate-spin rounded-lg border border-dashed border-primary/10 [animation-duration:35s]' />
        <div className='border-secondary/8 absolute inset-4 animate-spin rounded-lg border border-dotted [animation-direction:reverse] [animation-duration:45s]' />
      </div>

      <Link
        href={`https://github.com/${username}?tab=repositories`}
        target='_blank'
        rel='noopener noreferrer'
        aria-label={`Voir les repositories GitHub de ${username} - ${repositories || 0}+ projets open-source`}
        className={cn(
          cnLinkContainer,
          cnStatsBgShadow,
          'group/link relative z-20',
          'transition-all duration-500',
          // Effets hover sophistiqués
          'hover:scale-105 hover:shadow-2xl hover:shadow-primary/25',
          'transform-gpu will-change-transform',
          // Indicateur GitHub avec icône
          'after:absolute after:right-2 after:top-2 after:h-3 after:w-3 after:opacity-0',
          'after:transition-all after:duration-300 after:content-["⚡"]',
          'after:text-primary/60 hover:after:opacity-100',
          // Effet de glow subtil
          'before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br',
          'before:from-primary/5 before:to-secondary/5 before:opacity-0',
          'before:transition-opacity before:duration-500 hover:before:opacity-100'
        )}
      >
        {/* Dark overlay matching project cards */}
        <div className='pointer-events-none absolute inset-0 h-full w-full bg-card/80 opacity-0 transition-opacity duration-300 group-hover/link:opacity-100' />

        <div
          className={cn(
            cnStatsDivContainer,
            'relative z-10 transition-colors duration-300'
          )}
        >
          {/* Particules décoratives spécifiques GitHub */}
          <div className='absolute inset-0 overflow-hidden rounded-lg'>
            <div className='absolute left-3 top-4 h-1 w-1 animate-pulse rounded-full bg-orange-500/40 [animation-delay:0.5s] [animation-duration:3.5s]' />
            <div className='absolute right-3 top-7 h-0.5 w-0.5 animate-pulse rounded-full bg-green-500/40 [animation-delay:2s] [animation-duration:4s]' />
            <div className='absolute bottom-5 left-5 h-0.5 w-0.5 animate-pulse rounded-full bg-blue-500/40 [animation-delay:1s] [animation-duration:5s]' />
          </div>

          {loading ? (
            <Loader2
              className={cn(
                cnIconLoader,
                'relative z-10 transition-colors duration-300 group-hover/link:text-primary/80'
              )}
              aria-label='Chargement du nombre de repositories GitHub'
            />
          ) : (
            <p
              className={cn(
                cnStatsText,
                'relative z-10 transition-all duration-300',
                'group-hover/link:text-primary group-focus/link:text-primary',
                'transform-gpu group-hover/link:scale-110'
              )}
              aria-label={`${repositories || 0} repositories GitHub`}
            >
              {repositories || 0}+
            </p>
          )}
          <h3
            className={cn(
              cnStatsTitle,
              'transition-colors duration-300',
              'group-hover/link:text-primary/70 group-focus/link:text-primary/70'
            )}
          >
            Projets open-source
          </h3>
        </div>
      </Link>
    </div>
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
    <div className='group relative'>
      {/* Anneaux décoratifs subtils en rotation */}
      <div className='absolute inset-0 z-10 opacity-60'>
        <div className='absolute inset-2 animate-spin rounded-lg border border-dashed border-primary/10 [animation-duration:40s]' />
        <div className='border-secondary/8 absolute inset-4 animate-spin rounded-lg border border-dotted [animation-direction:reverse] [animation-duration:50s]' />
      </div>

      <Link
        href={`https://github.com/${username}`}
        target='_blank'
        rel='noopener noreferrer'
        aria-label={`Voir le profil GitHub de ${username} - ${years || 0}+ années d'activité`}
        className={cn(
          cnLinkContainer,
          cnStatsBgShadow,
          'group/link relative z-20',
          'transition-all duration-500',
          // Effets hover sophistiqués
          'hover:scale-105 hover:shadow-2xl hover:shadow-primary/25',
          'transform-gpu will-change-transform',
          // Indicateur de profil GitHub
          'after:absolute after:right-2 after:top-2 after:h-3 after:w-3 after:opacity-0',
          'after:transition-all after:duration-300 after:content-["👤"]',
          'after:text-primary/60 hover:after:opacity-100',
          // Effet de glow subtil
          'before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br',
          'before:from-primary/5 before:to-secondary/5 before:opacity-0',
          'before:transition-opacity before:duration-500 hover:before:opacity-100'
        )}
      >
        {/* Dark overlay matching project cards */}
        <div className='pointer-events-none absolute inset-0 h-full w-full bg-card/80 opacity-0 transition-opacity duration-300 group-hover/link:opacity-100' />

        <div
          className={cn(
            cnStatsDivContainer,
            'relative z-10 transition-colors duration-300'
          )}
        >
          {/* Particules décoratives spécifiques années */}
          <div className='absolute inset-0 overflow-hidden rounded-lg'>
            <div className='absolute left-4 top-3 h-0.5 w-0.5 animate-pulse rounded-full bg-cyan-500/40 [animation-delay:1s] [animation-duration:4.5s]' />
            <div className='absolute right-3 top-5 h-1 w-1 animate-pulse rounded-full bg-yellow-500/40 [animation-delay:0s] [animation-duration:3s]' />
            <div className='absolute bottom-3 left-6 h-0.5 w-0.5 animate-pulse rounded-full bg-pink-500/40 [animation-delay:2.5s] [animation-duration:4s]' />
          </div>

          {loading ? (
            <Loader2
              className={cn(
                cnIconLoader,
                'relative z-10 transition-colors duration-300 group-hover/link:text-primary/80'
              )}
              aria-label='Chargement des statistiques GitHub'
            />
          ) : (
            <>
              <span
                className={cn(
                  cnStatsText,
                  'relative z-10 transition-all duration-300',
                  'group-hover/link:text-primary group-focus/link:text-primary',
                  'transform-gpu group-hover/link:scale-110'
                )}
                aria-label={`${years || 0} années d'activité sur GitHub`}
              >
                {years || 0}+
              </span>
              <span
                className={cn(
                  cnStatsTextSmall,
                  'transition-colors duration-300',
                  'group-hover/link:text-primary/80 group-focus/link:text-primary/80'
                )}
              >
                15+ médico-social
              </span>
            </>
          )}
          <h3
            className={cn(
              cnStatsTitle,
              'transition-colors duration-300',
              'group-hover/link:text-primary/70 group-focus/link:text-primary/70'
            )}
          >
            Années d'activité
          </h3>
        </div>
      </Link>
    </div>
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
  const isXs = useIsXs();
  const isSm = useIsSm();

  const cnStatsBgShadow = `hover:shadow-xl hover:shadow-primary/20 transition-all duration-300`;

  const cnLinkContainer =
    'bg-gradient-to-br from-card/50 to-card/80 hover:from-card/70 hover:to-card/90 group relative block focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background rounded-lg overflow-hidden';

  const cnStatsDivContainer = cn(
    cnFlexFullCenter,
    cnFlexCol,
    cnPadding,
    'text-center relative'
  );

  // Styles de texte avec les mêmes couleurs que les cartes projets
  const cnStatsText = `text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground group-hover:text-foreground transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 opacity-90 group-hover:opacity-100`;
  const cnStatsTextSmall = `text-xs sm:text-sm text-card-foreground/80 group-hover:text-foreground/80 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 opacity-80 group-hover:opacity-100`;
  const cnStatsTitle = `text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-card-foreground/70 group-hover:text-foreground/80 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 opacity-75 group-hover:opacity-100`;

  const cnIconLoader = `h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 animate-spin text-muted-foreground group-hover:text-primary/80 transition-colors duration-300`;

  const getQRSize = () => {
    if (isXs) return 45;
    if (isSm) return 50;
    return 60;
  };

  const variantQRCode: {
    cornersType: 'dot' | 'square';
    size: number;
    className: string;
  } = {
    cornersType: 'square',
    size: getQRSize(), // Tailles plus petites pour mobile
    className: 'm-0 aspect-square shrink-0 p-0',
  };

  // Icônes pour le nuage derrière l'avatar
  const techIconSlugs = [
    'typescript',
    'javascript',
    'react',
    'redux',
    'axios',
    'nextjs',
    'shadcn',
    'nextdotjs',
    'tailwindcss',
    'nodejs',
    'git',
    'github',
    'html5',
    'css3',
    'sass',
    'figma',
    'render',
    'netlify',
    'vercel',
    'framermotion',
    'visualstudiocode',
    'postgresql',
    'mongodb',
    'docker',
    'sequelize',
    'nestjs',
    'expressjs',
    'jest',
    'eslint',
    'prettier',
    'husky',
    'lint-staged',
    'mocha',
    'chai',
  ];

  return (
    <div className='relative left-0 top-0 mx-auto w-full max-w-7xl px-3 py-8 sm:px-4 sm:py-12 md:py-16 lg:px-0 lg:py-20'>
      <div className='grid auto-rows-auto grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2 lg:gap-8'>
        {/* Image en premier en mobile (order-1), à droite en desktop */}
        <div
          className={cn(
            cnFlexFullCenter,
            'order-1 md:col-span-1 md:row-span-2 lg:order-2'
          )}
        >
          {imageSrc && (
            <div className='group relative'>
              {/* Conteneur avec anneaux décoratifs */}
              <div className='relative'>
                {/* Anneaux décoratifs en rotation lente */}
                <div className='absolute inset-0 z-10'>
                  <div className='absolute inset-3 animate-spin rounded-full border border-dashed border-primary/15 [animation-duration:25s]' />
                  <div className='absolute inset-6 animate-spin rounded-full border border-dotted border-secondary/10 [animation-direction:reverse] [animation-duration:35s]' />
                </div>

                {/* Avatar principal avec effet "tête qui sort" */}
                <Avatar
                  className={cn(
                    'relative z-20',
                    // PRÉSERVATION DE L'EFFET ORIGINAL : scale et position négative pour "sortir du cadre"
                    'scale-105 transition-transform duration-500 group-hover:scale-[1.12] sm:scale-110',
                    '-top-2 sm:-top-3 md:-top-[18px]', // Position négative conservée
                    cnBigImage,
                    // Effets visuels améliorés
                    'ring-2 ring-primary/30 ring-offset-2 ring-offset-background/50 drop-shadow-xl'
                  )}
                >
                  {/* Image de profil - visible par défaut, disparaît au hover */}
                  <AvatarImage
                    src={imageSrc}
                    alt={imageAlt}
                    className={cn(
                      'object-cover transition-all duration-700 ease-out',
                      // État par défaut : image visible et nette
                      'scale-100 opacity-100',
                      // Disparition au hover/touch pour laisser place au nuage
                      'group-hover:scale-95 group-hover:opacity-0',
                      'group-active:scale-95 group-active:opacity-0'
                    )}
                  />

                  {/* Nuage de technologies qui remplace l'image au hover/touch */}
                  <div
                    className={cn(
                      'absolute inset-0 flex items-center justify-center rounded-full',
                      // État par défaut : caché
                      'scale-90 opacity-0 transition-all duration-700 ease-out',
                      // Apparition au hover (desktop) et active (mobile)
                      'group-hover:scale-100 group-hover:opacity-100',
                      'group-active:scale-100 group-active:opacity-100',
                      // Background pour bonne lisibilité
                      'bg-gradient-to-br from-background/95 to-card/90 backdrop-blur-sm'
                    )}
                  >
                    <div className='relative scale-75 transition-all duration-1000 ease-out group-hover:scale-90 group-active:scale-90'>
                      <IconCloud iconSlugs={techIconSlugs} />
                    </div>

                    {/* Effet de particules tech flottantes */}
                    <div className='absolute inset-0 overflow-hidden rounded-full'>
                      <div className='absolute left-4 top-8 h-2 w-2 animate-pulse rounded-full bg-blue-500/50 [animation-delay:0s] [animation-duration:3s]' />
                      <div className='absolute right-6 top-12 h-1.5 w-1.5 animate-pulse rounded-full bg-green-500/50 [animation-delay:1s] [animation-duration:4s]' />
                      <div className='absolute bottom-10 left-8 h-1 w-1 animate-pulse rounded-full bg-purple-500/50 [animation-delay:2s] [animation-duration:5s]' />
                      <div className='absolute bottom-6 right-4 h-2 w-2 animate-pulse rounded-full bg-orange-500/50 [animation-delay:1.5s] [animation-duration:3.5s]' />
                    </div>
                  </div>

                  <AvatarFallback
                    className={cn(
                      'bg-gradient-to-br from-primary/10 to-secondary/10',
                      'border-2 border-primary/20 text-2xl font-bold text-primary backdrop-blur-sm'
                    )}
                  >
                    FD
                  </AvatarFallback>
                </Avatar>

                {/* Indicateur de disponibilité */}
                <div className='absolute bottom-2 right-2 z-30 translate-x-1 translate-y-1 transform'>
                  <div className='relative'>
                    {/* Point principal de statut */}
                    <div className='flex h-5 w-5 items-center justify-center rounded-full border-2 border-background bg-green-500 shadow-lg'>
                      <div className='h-2 w-2 animate-pulse rounded-full bg-white' />
                    </div>
                    {/* Effet de ping */}
                    <div className='absolute inset-0 h-5 w-5 animate-ping rounded-full bg-green-400 opacity-75' />
                    {/* Tooltip */}
                    <div className='pointer-events-none absolute bottom-full right-0 mb-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                      <div className='whitespace-nowrap rounded bg-black/90 px-2 py-1 text-xs text-white'>
                        Disponible pour alternance ou embauche
                      </div>
                      <div className='absolute right-2 top-full h-0 w-0 border-l-2 border-r-2 border-t-4 border-transparent border-t-black/90' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Titre en deuxième en mobile (order-2), à gauche en desktop */}
        <h1 className='order-2 col-span-1 row-span-1 mt-3 text-xl font-bold sm:mt-4 sm:text-2xl md:order-1 md:mt-6 md:text-4xl lg:mt-0 lg:text-5xl xl:whitespace-nowrap xl:text-7xl'>
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
              className='font-sans text-sm font-semibold text-primary sm:text-lg md:text-xl lg:text-3xl xl:whitespace-nowrap xl:text-5xl'
            />
          )}
        </h1>

        {/* Description en troisième en mobile (order-3), en bas à gauche en desktop */}
        <p className='order-3 col-span-1 row-span-1 mt-3 max-w-2xl font-sans text-xs text-muted-foreground sm:mt-4 sm:text-sm md:order-3 md:mt-6 md:text-base lg:text-lg xl:text-xl'>
          {capitalizeFirstLetterOfPhrase(formatSpecialWords(description))}
        </p>
      </div>

      {/* Section unifiée : statistiques et QR codes dans un seul bloc */}
      <div
        className={cn(
          'mt-6 font-sans sm:mt-8 md:mt-10 lg:mt-12',
          // Conteneur principal avec effet hover global
          'group/unified-section relative',
          'rounded-lg p-3 sm:p-4 md:p-6',
          cnStatsBgShadow,
          'bg-gradient-to-br from-card/30 to-card/50 backdrop-blur-sm',
          'transition-all duration-500',
          'hover:shadow-2xl hover:shadow-primary/20'
        )}
        role='region'
        aria-label='Statistiques et documents téléchargeables'
      >
        {/* Anneaux décoratifs pour l'ensemble du bloc */}
        <div className='absolute inset-0 z-10 opacity-60'>
          <div className='absolute inset-2 animate-spin rounded-lg border border-dashed border-primary/10 [animation-duration:60s]' />
          <div className='border-secondary/8 absolute inset-4 animate-spin rounded-lg border border-dotted [animation-direction:reverse] [animation-duration:80s]' />
        </div>

        {/* Grille responsive pour les éléments */}
        <div
          className={cn(
            'relative z-20 grid gap-3 sm:gap-4',
            // Responsive grid: 1 colonne sur mobile, 2 sur tablette, 5 sur desktop (3 stats + 2 QR codes)
            'grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5'
          )}
        >
          {/* Statistiques GitHub Repositories */}
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

          {/* Statistiques GitHub Years */}
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

          {/* Statistiques de Succès */}
          <SuccessCount
            cnLinkContainer={cnLinkContainer}
            cnStatsDivContainer={cnStatsDivContainer}
            cnStatsText={cnStatsText}
            cnStatsTextSmall={cnStatsTextSmall}
            cnStatsTitle={cnStatsTitle}
            cnStatsBgShadow={cnStatsBgShadow}
          />

          {/* QR Code CV */}
          <div className='group relative'>
            {/* Anneaux décoratifs pour CV */}
            <div className='absolute inset-0 z-10 opacity-60'>
              <div className='absolute inset-2 animate-spin rounded-lg border border-dashed border-primary/10 [animation-duration:45s]' />
              <div className='border-primary/8 absolute inset-4 animate-spin rounded-lg border border-dotted [animation-direction:reverse] [animation-duration:55s]' />
            </div>

            <div
              className={cn(
                cnLinkContainer,
                cnStatsBgShadow,
                cnStatsDivContainer,
                'group/qr-cv relative z-20',
                'transition-all duration-500',
                // Effets hover sophistiqués
                'hover:scale-105 hover:shadow-2xl hover:shadow-primary/25',
                'transform-gpu will-change-transform',
                // Effet de glow subtil
                'before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br',
                'before:from-primary/5 before:to-primary/10 before:opacity-0',
                'before:transition-opacity before:duration-500 hover:before:opacity-100'
              )}
              role='region'
              aria-label='Télécharger CV'
            >
              {/* Dark overlay matching project cards */}
              <div className='pointer-events-none absolute inset-0 h-full w-full bg-card/80 opacity-0 transition-opacity duration-300 group-hover/qr-cv:opacity-100' />

              {/* Particules décoratives spécifiques CV */}
              <div className='absolute inset-0 z-10 overflow-hidden rounded-lg'>
                <div className='absolute left-2 top-2 h-0.5 w-0.5 animate-pulse rounded-full bg-primary/40 [animation-delay:0s] [animation-duration:3s]' />
                <div className='absolute right-2 top-4 h-1 w-1 animate-pulse rounded-full bg-primary/60 [animation-delay:1.5s] [animation-duration:4s]' />
                <div className='absolute bottom-2 left-4 h-0.5 w-0.5 animate-pulse rounded-full bg-primary/30 [animation-delay:3s] [animation-duration:3.5s]' />
              </div>

              {/* Indicateur CV */}
              <div className='absolute right-2 top-2 z-20 opacity-0 transition-all duration-300 group-hover/qr-cv:opacity-100'>
                <div className='text-xs text-primary/60'>📄</div>
              </div>

              <Link
                href='/documents/resume.pdf'
                target='_blank'
                rel='noopener noreferrer'
                download='CV-Fabien-DARRIGRAND.pdf'
                aria-label='Télécharger mon CV (PDF) - Scanner le QR code ou cliquer'
                className={cn(
                  'group/qr relative flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background',
                  'transition-all duration-300',
                  // Hover effects adaptatifs selon la taille d'écran
                  isXs ? 'active:scale-105' : 'hover:scale-110 focus:scale-110',
                  'hover:drop-shadow-primary/25 hover:drop-shadow-lg'
                )}
              >
                <QRCodeComponent
                  value={`${typeof window !== 'undefined' ? window.location.origin : ''}/documents/resume.pdf`}
                  title='CV'
                  primaryColor='hsl(254, 87%, 61%)'
                  dotsType='classy-rounded'
                  {...variantQRCode}
                />
              </Link>

              {/* Lien textuel accessible */}
              <Link
                href='/documents/resume.pdf'
                target='_blank'
                rel='noopener noreferrer'
                download='CV-Fabien-DARRIGRAND.pdf'
                className={cn(
                  'mt-2 text-xs text-primary/80 underline transition-colors duration-300 hover:text-primary',
                  'translate-y-2 transform opacity-0 group-hover/qr-cv:translate-y-0 group-hover/qr-cv:opacity-100'
                )}
                aria-label='Télécharger le CV (PDF)'
              >
                📄 Télécharger
              </Link>
            </div>
          </div>

          {/* QR Code Lettre de Motivation */}
          <div className='group relative'>
            {/* Anneaux décoratifs pour Motivation */}
            <div className='absolute inset-0 z-10 opacity-60'>
              <div className='absolute inset-2 animate-spin rounded-lg border border-dashed border-secondary/10 [animation-duration:50s]' />
              <div className='border-secondary/8 absolute inset-4 animate-spin rounded-lg border border-dotted [animation-direction:reverse] [animation-duration:60s]' />
            </div>

            <div
              className={cn(
                cnLinkContainer,
                cnStatsBgShadow,
                cnStatsDivContainer,
                'group/qr-motivation relative z-20',
                'transition-all duration-500',
                // Effets hover sophistiqués
                'hover:scale-105 hover:shadow-2xl hover:shadow-secondary/25',
                'transform-gpu will-change-transform',
                // Effet de glow subtil
                'before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br',
                'before:from-secondary/5 before:to-secondary/10 before:opacity-0',
                'before:transition-opacity before:duration-500 hover:before:opacity-100'
              )}
              role='region'
              aria-label='Télécharger lettre de motivation'
            >
              {/* Dark overlay matching project cards */}
              <div className='pointer-events-none absolute inset-0 h-full w-full bg-card/80 opacity-0 transition-opacity duration-300 group-hover/qr-motivation:opacity-100' />

              {/* Particules décoratives spécifiques Motivation */}
              <div className='absolute inset-0 z-10 overflow-hidden rounded-lg'>
                <div className='absolute left-2 top-2 h-0.5 w-0.5 animate-pulse rounded-full bg-secondary/40 [animation-delay:0.5s] [animation-duration:3.5s]' />
                <div className='absolute right-2 top-4 h-1 w-1 animate-pulse rounded-full bg-secondary/60 [animation-delay:2s] [animation-duration:4.5s]' />
                <div className='absolute bottom-3 right-3 h-0.5 w-0.5 animate-pulse rounded-full bg-secondary/30 [animation-delay:1s] [animation-duration:3s]' />
              </div>

              {/* Indicateur Motivation */}
              <div className='absolute right-2 top-2 z-20 opacity-0 transition-all duration-300 group-hover/qr-motivation:opacity-100'>
                <div className='text-xs text-secondary/60'>✉️</div>
              </div>

              <Link
                href='/documents/motivation-letter.pdf'
                target='_blank'
                rel='noopener noreferrer'
                download='Lettre-Motivation-Fabien-DARRIGRAND.pdf'
                aria-label='Télécharger ma lettre de motivation (PDF) - Scanner le QR code ou cliquer'
                className={cn(
                  'group/qr relative flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:ring-offset-2 focus:ring-offset-background',
                  'transition-all duration-300',
                  // Hover effects adaptatifs selon la taille d'écran
                  isXs ? 'active:scale-105' : 'hover:scale-110 focus:scale-110',
                  'hover:drop-shadow-secondary/25 hover:drop-shadow-lg'
                )}
              >
                <QRCodeComponent
                  value={`${typeof window !== 'undefined' ? window.location.origin : ''}/documents/motivation-letter.pdf`}
                  title='Motivation'
                  primaryColor='hsl(14, 87%, 61%)'
                  dotsType='classy-rounded'
                  {...variantQRCode}
                />
              </Link>

              {/* Lien textuel accessible */}
              <Link
                href='/documents/motivation-letter.pdf'
                target='_blank'
                rel='noopener noreferrer'
                download='Lettre-Motivation-Fabien-DARRIGRAND.pdf'
                className={cn(
                  'mt-2 text-xs text-secondary/80 underline transition-colors duration-300 hover:text-secondary',
                  'translate-y-2 transform opacity-0 group-hover/qr-motivation:translate-y-0 group-hover/qr-motivation:opacity-100'
                )}
                aria-label='Télécharger la lettre de motivation (PDF)'
              >
                ✉️ Télécharger
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
  const ref = useRef(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);

  // Hook pour détecter la taille d'écran et les préférences de motion avec debounce
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const checkScreenSize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const width = window.innerWidth;
        setScreenWidth(width);
      }, 100); // Debounce de 100ms
    };

    const checkMotionPreference = () => {
      setPrefersReducedMotion(
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      );
    };

    // Initialisation
    checkScreenSize();
    checkMotionPreference();

    window.addEventListener('resize', checkScreenSize);

    const motionMediaQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );
    motionMediaQuery.addEventListener('change', checkMotionPreference);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', checkScreenSize);
      motionMediaQuery.removeEventListener('change', checkMotionPreference);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // S'assurer qu'on a un tableau valide
  const validProjects = Array.isArray(projects) ? projects : [];

  // Adapter le nombre de projets selon la taille d'écran
  const getProjectsPerRow = () => {
    const width = screenWidth || window.innerWidth;
    if (width < 640) return 4; // Mobile petits écrans (xs)
    if (width < 768) return 5; // Mobile grands écrans (sm)
    if (width < 1024) return 7; // Tablette (md)
    if (width < 1280) return 9; // Desktop (lg)
    return 11; // Large desktop (xl+)
  };

  // Dupliquer les projets pour créer suffisamment de contenu pour les 3 lignes
  let allProjects = [...validProjects];
  if (validProjects.length > 0) {
    const projectsPerRow = getProjectsPerRow();
    const projectsNeeded = projectsPerRow * 3;

    // Dupliquer les projets jusqu'à avoir assez pour toutes les lignes
    while (allProjects.length < projectsNeeded) {
      allProjects = [...allProjects, ...validProjects];
    }

    // S'assurer qu'on a exactement le bon nombre pour éviter les lignes partielles
    allProjects = allProjects.slice(0, projectsNeeded);
  }

  const projectsPerRowFinal = getProjectsPerRow();
  const firstRow = allProjects.slice(0, projectsPerRowFinal);
  const secondRow = allProjects.slice(
    projectsPerRowFinal,
    projectsPerRowFinal * 2
  );
  const thirdRow = allProjects.slice(
    projectsPerRowFinal * 2,
    projectsPerRowFinal * 3
  );

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  // Valeurs de translation adaptées au responsive et préférences d'accessibilité
  const getResponsiveValues = () => {
    const width = screenWidth || window.innerWidth;
    if (prefersReducedMotion)
      return { translation: 0, rotation: 0, translateY: [0, 0] };

    if (width < 640) {
      // Mobile xs
      return { translation: 300, rotation: 3, translateY: [-200, 150] };
    }
    if (width < 768) {
      // Mobile sm
      return { translation: 400, rotation: 5, translateY: [-250, 180] };
    }
    if (width < 1024) {
      // Tablette md
      return { translation: 600, rotation: 8, translateY: [-400, 300] };
    }
    if (width < 1280) {
      // Desktop lg
      return { translation: 900, rotation: 12, translateY: [-600, 400] };
    }
    // Large desktop xl+
    return { translation: 1200, rotation: 15, translateY: [-700, 500] };
  };

  const {
    translation: translationRange,
    rotation: rotationRange,
    translateY: translateYRange,
  } = getResponsiveValues();

  // Ajuster les valeurs de translation pour mieux remplir l'écran
  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, translationRange]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -translationRange]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [rotationRange, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(
      scrollYProgress,
      [0, 0.2],
      [prefersReducedMotion ? 1 : 0.2, 1]
    ),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [rotationRange, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], translateYRange),
    springConfig
  );
  return (
    <div
      ref={ref}
      className='relative flex h-[200vh] flex-col self-auto overflow-hidden py-12 antialiased [perspective:1000px] [transform-style:preserve-3d] xs:h-[220vh] xs:py-16 sm:h-[250vh] sm:py-20 md:h-[280vh] md:py-32 lg:h-[300vh] lg:py-40 lg:pl-20'
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
        className='relative'
      >
        {/* Première ligne - mouvement vers la droite */}
        {firstRow && firstRow.length > 0 && (
          <motion.div className='mb-6 flex min-w-max -translate-x-[15rem] flex-row space-x-4 pl-0 sm:mb-10 sm:-translate-x-[20rem] sm:space-x-6 md:mb-16 md:-translate-x-[25rem] md:space-x-10 lg:mb-20 lg:-translate-x-[35rem] lg:space-x-20'>
            {firstRow.map((project, index) => (
              <ProjectCard
                project={project}
                translate={translateX}
                key={`first-row-${project.title}-${index}`}
              />
            ))}
          </motion.div>
        )}

        {/* Deuxième ligne - mouvement vers la gauche */}
        {secondRow && secondRow.length > 0 && (
          <motion.div className='mb-6 flex min-w-max -translate-x-[15rem] flex-row-reverse space-x-4 space-x-reverse pr-0 sm:mb-10 sm:-translate-x-[20rem] sm:space-x-6 md:mb-16 md:-translate-x-[25rem] md:space-x-10 lg:mb-20 lg:-translate-x-[35rem] lg:space-x-20'>
            {secondRow.map((project, index) => (
              <ProjectCard
                project={project}
                translate={translateXReverse}
                key={`second-row-${project.title}-${index}`}
              />
            ))}
          </motion.div>
        )}

        {/* Troisième ligne - mouvement vers la droite */}
        {thirdRow && thirdRow.length > 0 && (
          <motion.div className='flex min-w-max -translate-x-[15rem] flex-row space-x-4 pl-0 sm:-translate-x-[20rem] sm:space-x-6 md:-translate-x-[25rem] md:space-x-10 lg:-translate-x-[35rem] lg:space-x-20'>
            {thirdRow.map((project, index) => (
              <ProjectCard
                project={project}
                translate={translateX}
                key={`third-row-${project.title}-${index}`}
              />
            ))}
          </motion.div>
        )}

        {/* Message de fallback si aucun projet n'est disponible */}
        {(!firstRow || firstRow.length === 0) &&
          (!secondRow || secondRow.length === 0) &&
          (!thirdRow || thirdRow.length === 0) && (
            <div className='flex h-32 items-center justify-center text-muted-foreground'>
              <p className='text-center'>
                Aucun projet disponible pour l'affichage parallax.
              </p>
            </div>
          )}
      </motion.div>
    </div>
  );
};
