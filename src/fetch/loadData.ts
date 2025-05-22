import type { CardProps } from '@src/types/CardProps';

/**
 * Charge les données du profil depuis le fichier JSON
 * @returns Une promesse contenant les données du profil
 */
export async function getAllData(): Promise<CardProps[]> {
  try {
    const dataModule = await import('@api/data.json');
    return dataModule.default as unknown as CardProps[];
  } catch (error) {
    console.error('Error loading data:', error);
    return [];
  }
}
