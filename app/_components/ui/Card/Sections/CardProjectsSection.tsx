import React from 'react';
import {
  CardTitle,
  CardDescription,
  CardContent,
  CardHeader,
} from '@/lib/components/ui/card';
import { Badge } from '@/lib/components/ui/badge';
import { ScrollArea } from '@/lib/components/ui/scroll-area';

interface Project {
  title: string;
  organization: string;
  tags: string[];
}

interface CardProjectsSectionProps {
  projects: Project[];
}

export const CardProjectsSection: React.FC<CardProjectsSectionProps> = ({
  projects,
}) => {
  return (
    <div className='p-4'>
      <ScrollArea>
        {projects.map((project, projectIndex) => (
          <div key={projectIndex} className='mb-4'>
            <CardHeader>
              <CardTitle className='font-caption text-2xl leading-tight tracking-tight'>
                {project.title}
              </CardTitle>
              <CardDescription className='text-base font-light leading-relaxed'>
                {project.organization}
              </CardDescription>
              <CardContent>
                {project.tags.map((tag, tagIndex) => (
                  <Badge key={tagIndex} className='mr-2'>
                    {tag}
                  </Badge>
                ))}
              </CardContent>
            </CardHeader>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};
