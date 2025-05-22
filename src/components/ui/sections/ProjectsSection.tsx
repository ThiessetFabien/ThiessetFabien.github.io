/**
 * @file CardProjects.tsx
 * @description This file exports a component that renders a list of project cards.
 */

import { useRef, useState, useEffect, useCallback } from 'react';

import { ProjectCard } from '@src/components/ui/cards/ProjectCard';
import { useIsLg, useIsSm, useIsXs } from '@src/styles/mediaQueries.style';
import type { CardProps } from '@src/types/CardProps';

/**
 * CardProjects component.
 * @param {Object} props - The props for the component.
 * @param {Projects[]} props.projects - An array of project objects to be displayed.
 * @param {string} [props.className] - Additional class names to apply to the component.
 * @returns {JSX.Element} The rendered CardProjects component.
 * @example
 * <CardProjects projects={projects} className="custom-class" />
 */

export const ProjectsSection: React.FC<{
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
  const isSm = useIsSm();
  const isXs = useIsXs();

  // Initialize states when projects change
  useEffect(() => {
    if (projects?.length) {
      setVisibleCards(new Array(projects.length).fill(false));
      setImagesLoaded(new Array(projects.length).fill(false));
      setVideoLoaded(new Array(projects.length).fill(false));
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

              setVisibleMediaIndices((prev) => {
                const updated = new Set(prev);
                updated.add(index);
                return updated;
              });

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

        // Ajouter un gestionnaire d'erreur spécifique pour Casalink
        videoRefs.current[index]!.onerror = () => {
          console.warn(
            'Erreur de chargement vidéo Casalink - passage au fallback'
          );
          // Marquer la vidéo comme chargée pour éviter de bloquer l'interface
          handleVideoLoaded(index);
        };
      }
    });
  }, [projects, visibleMediaIndices, handleVideoLoaded]);

  const setVideoRef = useCallback(
    (el: HTMLVideoElement | null, index: number) => {
      videoRefs.current[index] = el;
    },
    []
  );

  const setCardRef = useCallback((el: HTMLDivElement | null, index: number) => {
    cardRefs.current[index] = el;
  }, []);

  const shouldLoadVideo = useCallback(
    (index: number): boolean => visibleMediaIndices.has(index),
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
          isSm={isSm}
          isXs={isXs}
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

ProjectsSection.displayName = 'ProjectsSection';
