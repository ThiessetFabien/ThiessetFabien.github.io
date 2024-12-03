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
import { ExternalLink, FolderGit2, Video } from 'lucide-react';

interface CardProjectsSectionProps {
  projects: Projects[];
  className?: string;
}

export const CardProjectsSection: React.FC<CardProjectsSectionProps> = ({
  projects,
  className,
}) => {
  return (
    <ScrollArea className={cn(className)}>
      {projects.map((project, projectIndex) => (
        <Card key={projectIndex} className='mb-4 rounded-xl border shadow'>
          <CardHeader>
            <div className='flex items-center justify-between'>
              <CardTitle className='flex items-center font-caption text-xl leading-tight tracking-tight'>
                <a
                  href={project.website}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center'
                >
                  {project.title}
                  <ExternalLink className='ml-2' />
                </a>
                {project.demo && (
                  <a
                    href={project.demo}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='ml-2'
                  >
                    <Video />
                  </a>
                )}
                <a
                  href={project.github}
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
              <Badge key={tagIndex} variant='secondary' className='mr-2'>
                {tag.toString()}
              </Badge>
            ))}
          </CardContent>
        </Card>
      ))}
    </ScrollArea>
  );
};
