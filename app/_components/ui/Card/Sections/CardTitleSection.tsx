import { CardTitle } from '@/lib/components/ui/card';

export const TitleSection = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => <CardTitle className={className}>{title}</CardTitle>;
