export const dynamicDownload = (downloadActive: boolean) => {
  return downloadActive ? { download: true } : { target: '_blank' };
};
