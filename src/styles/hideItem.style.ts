/**
 * Determines the visibility of an item based on its value.
 *
 * @param item - The string value of the item to evaluate.
 * @returns A string indicating the visibility of the item.
 *          Returns 'hidden' if the item is an empty string, otherwise returns an empty string.
 */
export const hideItem = (item: string) => {
  return item === '' ? 'hidden' : '';
};

export const cnHiddenSmBlock = 'hidden sm:block';

export const cnHiddenXxsFlex = 'xxs:flex hidden';

export const cnHiddenXsFlex = 'xs:flex hidden';

export const cnHiddenSmFlex = 'sm:flex hidden';

export const cnXxsHidden = 'xxs:hidden';

export const cnSmHidden = 'sm:hidden';
