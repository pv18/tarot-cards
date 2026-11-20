export type Suit = 'major' | 'cups' | 'swords' | 'pentacles' | 'wands';

export interface ICard {
  /** Номер файла картинки /img/{id}.jpg, от 1 до 78 */
  id: number;
  suit: Suit;
  /** Старшие арканы: 0–21, младшие: 1–14 (Туз…Король) */
  rank: number;
  name: string;
  keywords: string[];
  upright: string;
  reversed: string;
}

export interface ICardDrawn {
  card: ICard;
  reversed: boolean;
}

export const SUIT_TITLES: Record<Suit, string> = {
  major: 'Старшие арканы',
  cups: 'Кубки',
  swords: 'Мечи',
  pentacles: 'Пентакли',
  wands: 'Посохи',
};

export type ReadingType =
  'day' | 'three' | 'five' | 'celtic' | 'relationship' | 'career' | 'yesno';

export interface IReadingCard {
  cardId: number;
  reversed: boolean;
  /** Название позиции расклада, если она есть */
  position?: string;
}

export interface IReading {
  id: string;
  type: ReadingType;
  /** ISO-дата создания */
  date: string;
  question?: string;
  cards: IReadingCard[];
}
