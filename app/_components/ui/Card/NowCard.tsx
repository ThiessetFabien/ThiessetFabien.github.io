import { cnParagraph } from '@/styles/fontStyles';
import CardProps from '@/types/CardProps';

export const NowCard: React.FC<CardProps> = ({ content }) => {
  return (
    <>
      <p className={cnParagraph}>{content}</p>
    </>
  );
};
