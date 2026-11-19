import { describe, expect, it } from 'vitest';
import { decodeReading, encodeReading } from './share';

const reading = {
  type: 'three' as const,
  date: '2026-11-19T20:00:00.000Z',
  question: 'Что меня ждёт?',
  cards: [
    { cardId: 1, reversed: false, position: 'Прошлое' },
    { cardId: 22, reversed: true },
  ],
};

describe('share', () => {
  it('encode → decode возвращает тот же расклад', () => {
    const encoded = encodeReading(reading);
    const decoded = decodeReading(`#r=${encoded}`);
    expect(decoded).toEqual(reading);
  });

  it('возвращает null без hash-параметра', () => {
    expect(decodeReading('')).toBeNull();
    expect(decodeReading('#other=1')).toBeNull();
  });

  it('возвращает null на битых данных', () => {
    expect(decodeReading('#r=%7B%22broken%22')).toBeNull();
    expect(
      decodeReading(`#r=${encodeReading({ ...reading, cards: [] })}`)
    ).toBeNull();
  });
});
