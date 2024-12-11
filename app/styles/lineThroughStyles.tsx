export const lineThroughItem = (date: string) => {
  return date.includes('present') ? '' : 'line-through text-muted-foreground';
};
