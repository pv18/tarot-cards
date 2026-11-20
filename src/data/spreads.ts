export interface ISpreadPosition {
  name: string;
}

export const THREE_POSITIONS: ISpreadPosition[] = [
  { name: 'Прошлое' },
  { name: 'Настоящее' },
  { name: 'Будущее' },
];

export const RELATIONSHIP_POSITIONS: ISpreadPosition[] = [
  { name: 'Ты' },
  { name: 'Партнёр' },
  { name: 'Отношения сейчас' },
  { name: 'Что мешает' },
  { name: 'Направление' },
];

export const CAREER_POSITIONS: ISpreadPosition[] = [
  { name: 'Ситуация' },
  { name: 'Твои силы' },
  { name: 'Препятствия' },
  { name: 'Возможности' },
  { name: 'Совет' },
];

/** Схема кельтского креста: 1–6 крест, 7–10 колонна (снизу вверх) */
export const CELTIC_POSITIONS: ISpreadPosition[] = [
  { name: 'Настоящее' },
  { name: 'Препятствие' },
  { name: 'Корень ситуации' },
  { name: 'Прошлое' },
  { name: 'Возможное будущее' },
  { name: 'Ближайшее будущее' },
  { name: 'Вы сами' },
  { name: 'Внешние влияния' },
  { name: 'Надежды и страхи' },
  { name: 'Итог' },
];
