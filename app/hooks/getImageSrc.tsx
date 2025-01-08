export const getImageSrc = (
  source: string,
  isXxs: boolean,
  isXs: boolean,
  isMd: boolean,
  isLg: boolean,
  isXl: boolean
) => {
  let suffix = '';

  switch (true) {
    case isXl:
      suffix = '-xl';
      break;
    case isLg:
      suffix = '-lg';
      break;
    case isMd:
      suffix = '-md';
      break;
    case isXs:
      suffix = '-xs';
      break;
    case isXxs:
      suffix = '-xxs';
      break;
    default:
      suffix = '';
      break;
  }

  return `/images/${source}-xl.webp`;
  // return `/images/${source}${suffix}.webp`;
};
