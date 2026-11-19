import { type ICard } from '../types/types';
import { majorArcana } from './majorArcana';
import { minorArcana } from './minorArcana';

export const cards: ICard[] = [...majorArcana, ...minorArcana];

export const getCardById = (id: number): ICard =>
  cards.find((card) => card.id === id) as ICard;

export const cardImage = (id: number) => `/img/${id}.jpg`;
