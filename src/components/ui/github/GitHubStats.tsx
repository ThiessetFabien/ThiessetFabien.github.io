'use client';

import React from 'react';
import { CountUp } from '@src/components/ui/animation/CountUp';
import type { GitHubStats as GitHubStatsType } from '@src/types/GitHubStats';
import { fetchGitHubStats } from '@src/lib/fetch/github-stats';

interface GitHubStatsProps {
  /** Additional CSS classes to apply to the component */
  className?: string;
  /** GitHub username - default: ThiessetFabien */
  username?: string;
}

/**
 * Component displaying GitHub statistics for a user
 */
export const GitHubStats: React.FC<GitHubStatsProps> = ({
  className,
  username = process.env.NEXT_PUBLIC_GITHUB_DEFAULT_USERNAME,
}): JSX.Element => {
  const [stats, setStats] = React.useState<GitHubStatsType | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const getStats = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchGitHubStats(username);
        setStats(data);
      } catch (err) {
        console.error('Error retrieving GitHub stats:', err);
        setError(
          err instanceof Error
            ? `Unable to load GitHub statistics: ${err.message}`
            : 'Unable to load GitHub statistics'
        );
        setStats(null);
      } finally {
        setIsLoading(false);
      }
    };

    getStats();
  }, [username]);

  if (isLoading) {
    return (
      <div className='flex min-h-[200px] items-center justify-center'>
        <div className='flex animate-pulse flex-col items-center gap-4'>
          <div className='h-6 w-40 rounded bg-muted' />
          <div className='grid w-full max-w-xs grid-cols-2 gap-4'>
            <div className='h-24 rounded bg-muted' />
            <div className='h-24 rounded bg-muted' />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='text-center text-sm text-muted-foreground/80'>
        {error}
      </div>
    );
  }

  if (!stats) {
    return (
      <div className='text-center text-sm text-muted-foreground/80'>
        Aucune donnée disponible
      </div>
    );
  }

  const statItems = [
    {
      value: stats.repositories,
      label: 'Projets Publics',
      color: 'white',
      suffix: '+',
    },
    {
      value: stats.yearsOfActivity,
      label: "Années d'Expérience",
      color: 'white',
      suffix: '+',
    },
  ] as const;

  return (
    <>
      {statItems.map((item) => (
        <div key={item.label} className={className}>
          <CountUp
            end={item.value}
            suffix={item.suffix}
            className='text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl'
          />
          <span className='text-center text-sm text-muted-foreground/90 transition-colors group-hover:text-muted-foreground'>
            {item.label}
          </span>
        </div>
      ))}
    </>
  );
};
