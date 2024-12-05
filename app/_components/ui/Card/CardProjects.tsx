'use client';

import React from 'react';
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
import { Projects } from '@/types/Projects';
import { ExternalLink, FolderGit2, SquarePlay } from 'lucide-react';
import { ImageSection } from './CardImage';
import { dynamicMarginBottom } from '@/utils/dynamicMarginBottom';
import { baseUrl } from '@/utils/constants/baseUrl';

interface CardProjectsProps {
  projects: Projects[];
  className?: string;
}

export const CardProjects: React.FC<CardProjectsProps> = ({
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
                <ImageSection
                  imageSrc={project.imageSrc}
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
