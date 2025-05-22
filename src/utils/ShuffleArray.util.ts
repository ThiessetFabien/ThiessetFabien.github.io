import type { TestimonialProps } from '@src/types/TestimonialProps';

/**
 * Shuffles an array using the Fisher-Yates (Knuth) shuffle algorithm.
 * This function does NOT mutate the original array.
 *
 * @param {TestimonialProps[]} inputArray - The array to be shuffled
 * @returns {TestimonialProps[]} A new shuffled array
 */
export const shuffleArray = (
  inputArray: TestimonialProps[]
): TestimonialProps[] => {
  // Créer une copie pour ne pas modifier l'original
  const array = [...inputArray];

  // Utiliser une boucle for sans décrémenter avec i--
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    // Utiliser une variable temporaire pour l'échange
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
};
