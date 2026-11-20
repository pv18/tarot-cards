import { describe, expect, it } from 'vitest';
import {
  CAREER_POSITIONS,
  CELTIC_POSITIONS,
  RELATIONSHIP_POSITIONS,
  THREE_POSITIONS,
} from './spreads';

describe('схемы раскладов', () => {
  it('позиции уникальны и не пусты', () => {
    const all = [
      ...THREE_POSITIONS,
      ...RELATIONSHIP_POSITIONS,
      ...CAREER_POSITIONS,
      ...CELTIC_POSITIONS,
    ];
    for (const { name } of all) {
      expect(name.trim()).not.toBe('');
    }
  });

  it('размеры схем соответствуют раскладам', () => {
    expect(THREE_POSITIONS).toHaveLength(3);
    expect(RELATIONSHIP_POSITIONS).toHaveLength(5);
    expect(CAREER_POSITIONS).toHaveLength(5);
    expect(CELTIC_POSITIONS).toHaveLength(10);
  });
});
