import type { QualityInspection, BasicCard, CardType } from '~/api/types';

export interface AddCardProps {
  description?: string;
}

export interface CardBlockProps {
  type: CardType;
  card: QualityInspection & BasicCard;
  loading?: boolean;
}

export type CardItem = QualityInspection & BasicCard;
