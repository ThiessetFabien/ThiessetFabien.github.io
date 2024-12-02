export const ContentSection = ({
  content,
  className,
}: {
  content: React.ReactNode;
  className?: string;
}) => <div className={className}>{content}</div>;
