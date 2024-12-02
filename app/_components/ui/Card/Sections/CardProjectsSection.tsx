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

interface CardProjectsSectionProps {
  projects: Projects[];
  className?: string;
}

export const CardProjectsSection: React.FC<CardProjectsSectionProps> = ({
  projects,
  className,
}) => {
  return (
    <>
      <ScrollArea className={cn(className)}>
        {projects.map((project, projectIndex) => (
          <Card key={projectIndex} className='mb-4 rounded-xl border shadow'>
            <CardHeader>
              <CardTitle className='font-caption text-xl leading-tight tracking-tight'>
                {project.title}
              </CardTitle>
              <CardDescription className='text-sm font-light leading-relaxed'>
                {project.organization}
              </CardDescription>
              <CardContent>
                {project.tags.map((tag, tagIndex) => (
                  <Badge key={tagIndex} variant='secondary' className='mr-2'>
                    {tag.toString()}
                  </Badge>
                ))}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </ScrollArea>
    </>
  );
};
