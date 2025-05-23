'use client';

import type { GitHubStats } from '@src/types/GitHubStats';

const GITHUB_API_BASE_URL =
  process.env.NEXT_PUBLIC_GITHUB_API_BASE_URL || 'https://api.github.com/users';
const DEFAULT_GITHUB_USERNAME =
  process.env.NEXT_PUBLIC_GITHUB_DEFAULT_USERNAME || 'ThiessetFabien';

/**
 * Calculate the number of years of activity between two dates
 * @param createdAt - Account creation date
 * @returns The number of years of activity
 */
const calculateYearsOfActivity = (createdAt: string): number => {
  const creationDate = new Date(createdAt);
  const now = new Date();
  return now.getFullYear() - creationDate.getFullYear();
};

/**
 * Fetch GitHub statistics for a user
 * @param username - GitHub username
 * @returns The user's GitHub statistics
 * @throws Error if the request fails
 */
export async function fetchGitHubStats(
  username: string = DEFAULT_GITHUB_USERNAME
): Promise<GitHubStats> {
  try {
    const response = await fetch(`${GITHUB_API_BASE_URL}/${username}`);
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    return {
      yearsOfActivity: calculateYearsOfActivity(data.created_at),
      repositories: data.public_repos,
    };
  } catch (error) {
    console.error('Error retrieving GitHub stats:', error);
    throw error;
  }
}
