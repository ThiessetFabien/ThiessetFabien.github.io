'use client';

import React from 'react';
import Image from 'next/image';
import { Code, ExternalLink, SquarePlay } from 'lucide-react';
import {
  CardTitle,
  CardDescription,
  CardContent,
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
import {
  cnGap,
  cnMarginBottom,
  cnPadding,
  cnSmallMarginLeft,
} from '@/styles/boxModelStyles';
import { cnParagraph, cnSmallText, cnTitle2 } from '@/styles/fontStyles';
import { sizeIcon } from '@/styles/sizeStyles';

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
        'grid sm:auto-rows-auto sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-1'
      )}
    >
      {projects &&
        projects.map((project, projectIndex) => (
          <Card
            key={projectIndex}
            className={cn(
              cnBorder,
              cnGap,
              dynamicMarginBottom(projectIndex),
              'h-full w-full',
              projectIndex === 0
                ? 'sm:col-span-2 lg:col-span-1'
                : 'sm:col-span-1'
            )}
          >
            <CardHeader className={cnPadding}>
              {project.imageSrc && project.imageAlt && (
                <a
                  href={`${baseUrl}${project.website}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center'
                >
                  <Image
                    src={`/images/${project.imageSrc}`}
                    alt={project.imageAlt || ''}
                    width={590}
                    height={332}
                    priority
                    className={cn(cnMarginBottom, 'h-auto w-full')}
                  />
                </a>
              )}
              <div className={cnFlexBetweenX}>
                <CardTitle className={cn(cnTitle2, cnFlexCenterY)}>
                  <a
                    href={`${baseUrl}${project.website}`}
                    target='_blank'
                    rel='noopener noreferrer'
                    className={cnFlexCenterY}
                  >
                    {project.title}
                    <ExternalLink className={cn(sizeIcon, cnSmallMarginLeft)} />
                  </a>
                  {project.demo && (
                    <a
                      href={`${baseUrl}${project.demo}`}
                      target='_blank'
                      rel='noopener noreferrer'
                      className={cnSmallMarginLeft}
                    >
                      <SquarePlay className={sizeIcon} />
                    </a>
                  )}
                  <a
                    href={`${baseUrl}${project.github}`}
                    target='_blank'
                    rel='noopener noreferrer'
                    className={cnSmallMarginLeft}
                  >
                    <Code className={sizeIcon} />
                  </a>
                </CardTitle>
              </div>
              <CardDescription className={cnParagraph}>
                {project.organization}
              </CardDescription>
            </CardHeader>
            <CardContent className={cnPadding}>
              {project.tags.map((tag, tagIndex) => (
                <Badge
                  key={tagIndex}
                  variant={tagIndex > 0 ? 'outline' : 'default'}
                  className='mr-1'
                >
                  <p
                    className={tagIndex !== 0 ? 'font-light' : ''}
                  >{`${tag}`}</p>
                </Badge>
              ))}
            </CardContent>
          </Card>
        ))}
    </div>
  );
};
