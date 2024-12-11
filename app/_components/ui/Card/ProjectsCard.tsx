'use client';

import React from 'react';
import { ExternalLink, FolderGit2, SquarePlay } from 'lucide-react';
import {
  CardTitle,
  CardDescription,
  CardContent,
  CardHeader,
  Card,
} from '@/lib/components/ui/card';
import { Badge } from '@/lib/components/ui/badge';
import { ScrollArea } from '@/lib/components/ui/scroll-area';
import { cn } from '@/lib/utils';

import { CardImage } from './ImageCard';
import { dynamicMarginBottom } from '@/utils/dynamicMarginBottom';
import { baseUrl } from '@/utils/constants/baseUrl';

import { ProjectsProps } from '@/types/ProjectsProps';

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

export const CardProjects: React.FC<ProjectsProps> = ({
  projects,
  className,
}) => {
  return (
    <ScrollArea className={cn(className)}>
      {projects.map((project, projectIndex) => (
        <Card
          key={projectIndex}
          className={cn(
            'rounded-xl border shadow',
            dynamicMarginBottom(projectIndex)
          )}
        >
          <CardHeader>
            {project.imageSrc && project.imageAlt && (
              <a
                href={`${baseUrl}${project.website}`}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center'
              >
                <CardImage
                  imageSrc={`/${project.imageSrc}`}
                  imageAlt={project.imageAlt || ''}
                  width={590}
                  height={332}
                  className='mb-4 h-auto w-full'
                />
              </a>
            )}
            <div className='flex items-center justify-between'>
              <CardTitle className='flex items-center font-caption text-xl leading-tight tracking-tight'>
                <a
                  href={`${baseUrl}${project.website}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center'
                >
                  {project.title}
                  <ExternalLink className='ml-2' />
                </a>
                {project.demo && (
                  <a
                    href={`${baseUrl}${project.demo}`}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='ml-2'
                  >
                    <SquarePlay />
                  </a>
                )}
                <a
                  href={`${baseUrl}${project.github}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='ml-2'
                >
                  <FolderGit2 />
                </a>
              </CardTitle>
            </div>
            <CardDescription className='text-sm font-light leading-relaxed'>
              {project.organization}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {project.tags.map((tag, tagIndex) => (
              <Badge key={tagIndex} variant='secondary' className='mr-4'>
                {tag}
              </Badge>
            ))}
          </CardContent>
        </Card>
      ))}
    </ScrollArea>
  );
};
