import { beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { CardOfDay } from './CardOfDay';

describe('CardOfDay', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('до тяги показывает рубашку и подсказку', () => {
    render(<CardOfDay />);
    expect(screen.getByRole('button', { name: 'Тянуть карту' })).toBeTruthy();
    expect(screen.getByText(/Задайте себе вопрос дня/)).toBeTruthy();
  });

  it('после тяги показывает карту и сохраняет её в localStorage', async () => {
    render(<CardOfDay />);
    fireEvent.click(screen.getByRole('button', { name: 'Тянуть карту' }));

    const name = await screen.findByRole('heading', { level: 2 });
    expect(name.textContent?.length).toBeGreaterThan(0);

    const stored = localStorage.getItem('tarot-card-of-day');
    expect(stored).toBeTruthy();
    const parsed = JSON.parse(stored as string);
    expect(parsed.cardId).toBeGreaterThanOrEqual(1);
    expect(parsed.cardId).toBeLessThanOrEqual(78);
    expect(parsed.date).toBeTruthy();
  });

  it('после перезагрузки восстанавливает карту дня', async () => {
    const now = new Date();
    localStorage.setItem(
      'tarot-card-of-day',
      JSON.stringify({
        date: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`,
        cardId: 20,
        reversed: false,
      })
    );

    render(<CardOfDay />);
    const name = await screen.findByRole('heading', { level: 2 });
    expect(name.textContent).toBe('Солнце');
    expect(screen.getByRole('button', { name: 'Тянуть заново' })).toBeTruthy();
  });
});
