import type { SectionProps } from '@src/types/SectionProps';

/**
 * Charge les données du profil depuis le fichier JSON
 * @returns Une promesse contenant les données du profil
 */
export async function getAllData(): Promise<SectionProps[]> {
  try {
    const dataModule = await import('@api/data.json');
    return dataModule.default as unknown as SectionProps[];
  } catch (error) {
    console.error('Error loading data:', error);
    return [];
  }
}
