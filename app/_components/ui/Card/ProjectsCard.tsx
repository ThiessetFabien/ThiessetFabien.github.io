'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  CardTitle,
  CardDescription,
  CardFooter,
  CardHeader,
  Card,
} from '@/lib/components/ui/card';
import { Badge } from '@/lib/components/ui/badge';
import { cn } from '@/lib/utils';

import { dynamicMarginBottom } from '@/utils/dynamicMarginBottom';
import { baseUrl } from '@/utils/constants/baseUrl';
import CardProps from '@/types/CardProps';
import { cnBorder } from '@/styles/borderStyles';
import { cnFlexBetweenX, cnFlexCenterY } from '@/styles/flexStyles';
import { cnGap, cnMarginBottom, cnPadding } from '@/styles/boxModelStyles';
import { cnParagraph, cnTitle2 } from '@/styles/fontStyles';
import ActionButton from '../CallToAction/ActionButton';
import useIntersectionObserver from '@/hooks/IntersectionObserver';

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

export const CardProjects: React.FC<CardProps> = ({ projects, className }) => {
  return (
    <div
      className={cn(
        className,
        cnGap,
        'h-full',
        'grid sm:auto-rows-auto sm:grid-cols-2 lg:grid-cols-1'
      )}
    >
      {projects &&
        projects.map((project, projectIndex) => (
          <Card
            key={projectIndex}
            className={cn(
              'container',
              cnBorder,
              cnGap,
              dynamicMarginBottom(projectIndex),
              'h-auto w-full',
              projectIndex === 0
                ? 'sm:col-span-2 lg:col-span-1'
                : 'sm:col-span-1'
            )}
          >
            <CardHeader className={cnPadding}>
              <div className={cn(cnMarginBottom, 'h-full w-full')}>
                <a
                  href={`${baseUrl}${project.website}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={cnFlexCenterY}
                >
                  {project.imageSrc && project.imageAlt && (
                    <Image
                      src={`/images/${project.imageSrc}`}
                      alt={project.imageAlt || ''}
                      width={590}
                      height={332}
                      priority
                    />
                  )}
                  {!project.imageSrc &&
                    !project.imageAlt &&
                    project.videoSrc &&
                    project.videoAlt && (
                      <video
                        src={`${baseUrl}${project.videoSrc}`}
                        alt={project.videoAlt || ''}
                        controls={false}
                        autoPlay={true}
                        loop={true}
                        muted
                      />
                    )}
                </a>
              </div>
              <div className={cnFlexBetweenX}>
                <CardTitle className={cn(cnTitle2, cnFlexBetweenX)}>
                  <a
                    href={`${baseUrl}${project.website}`}
                    target='_blank'
                    rel='noopener noreferrer'
                    className={cnFlexCenterY}
                  >
                    <h3>{project.title}</h3>
                  </a>
                  <div>
                    <ActionButton
                      icon='Github'
                      href={`${baseUrl}${project.github}`}
                      downloadActive={false}
                      variant='ghost'
                      size='icon'
                    />
                    {project.demo && (
                      <ActionButton
                        icon='SquarePlay'
                        href={`${baseUrl}${project.demo}`}
                        downloadActive={false}
                        variant='ghost'
                        size='icon'
                      />
                    )}
                    <ActionButton
                      icon='ExternalLink'
                      href={`${baseUrl}${project.website}`}
                      downloadActive={false}
                      variant='ghost'
                      size='icon'
                    />
                  </div>
                </CardTitle>
              </div>
              <CardDescription className={cnParagraph}>
                {project.organization}
              </CardDescription>
            </CardHeader>
            <CardFooter className={cn('flex flex-wrap', 'h-auto')}>
              {project.tags.map((tag, tagIndex) => (
                <Badge
                  key={tagIndex}
                  variant='outline'
                  className='border-0 font-light'
                >
                  <p>{`${tag}`}</p>
                </Badge>
              ))}
            </CardFooter>
          </Card>
        ))}
    </div>
  );
};
