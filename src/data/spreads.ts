export interface ISpreadPosition {
  name: string;
}

export const THREE_POSITIONS: ISpreadPosition[] = [
  { name: 'Прошлое' },
  { name: 'Настоящее' },
  { name: 'Будущее' },
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
