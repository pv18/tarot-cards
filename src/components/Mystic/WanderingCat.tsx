import React, { useEffect, useRef, useState } from 'react';
import { useMysticEnabled } from '../../hooks/useMysticEnabled';
import s from './WanderingCat.module.scss';

type Phase = 'running' | 'sitting';

const CAT_WIDTH = 130;
const SPEED = 105; // px в секунду — неспешная кошачья походка

// кот-фамильяр: время от времени пробегает по нижнему краю экрана,
// иногда останавливается посидеть и поморгать, и уходит дальше.
// Движение ведётся через transition + setTimeout — не зависит от rAF.
export const WanderingCat: React.FC = () => {
  const enabled = useMysticEnabled();
  const catRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>('running');
  const [facing, setFacing] = useState<1 | -1>(1);
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    if (!enabled) return undefined;
    const cat = catRef.current;
    if (!cat) return undefined;

    const timers = timersRef.current;
    const later = (fn: () => void, ms: number) => {
      timers.push(window.setTimeout(fn, ms));
    };

    // ставим кота в точку без анимации, затем ведём с анимацией
    const moveTo = (from: number, to: number, seconds: number) => {
      cat.style.transition = 'none';
      cat.style.transform = `translateX(${from}px)`;
      void cat.offsetWidth; // фиксируем стартовую позицию до включения transition
      cat.style.transition = `transform ${seconds}s linear`;
      cat.style.transform = `translateX(${to}px)`;
    };

    const stroll = () => {
      const vw = window.innerWidth;
      const leftToRight = Math.random() > 0.5;
      const from = leftToRight ? -CAT_WIDTH : vw;
      const to = leftToRight ? vw : -CAT_WIDTH;
      setFacing(leftToRight ? 1 : -1);

      const withRest = Math.random() > 0.4;
      const restAt = from + (to - from) * (0.4 + Math.random() * 0.25);

      if (!withRest) {
        const seconds = Math.abs(to - from) / SPEED;
        moveTo(from, to, seconds);
        setPhase('running');
        later(stroll, seconds * 1000 + 20000 + Math.random() * 35000);
        return;
      }

      const first = Math.abs(restAt - from) / SPEED;
      const second = Math.abs(to - restAt) / SPEED;
      moveTo(from, restAt, first);
      setPhase('running');
      later(() => {
        setPhase('sitting');
        later(
          () => {
            setPhase('running');
            moveTo(restAt, to, second);
            later(stroll, second * 1000 + 20000 + Math.random() * 35000);
          },
          3500 + Math.random() * 6000
        );
      }, first * 1000);
    };

    timers.push(window.setTimeout(stroll, 5000 + Math.random() * 7000));

    return () => {
      timers.forEach((id) => window.clearTimeout(id));
      timers.length = 0;
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={catRef}
      aria-hidden='true'
      className={[s.cat, phase === 'sitting' ? s.sitting : '']
        .filter(Boolean)
        .join(' ')}
    >
      <div className={s.bob}>
        <svg
          viewBox='0 0 120 100'
          width={CAT_WIDTH}
          height={(CAT_WIDTH * 100) / 120}
          className={[s.glyph, facing === -1 ? s.flip : '']
            .filter(Boolean)
            .join(' ')}
        >
          <g className={s.tail}>
            <path
              d='M 22 86 C 6 84, 3 64, 15 57'
              fill='none'
              className={s.furStroke}
              strokeWidth='8'
              strokeLinecap='round'
            />
          </g>
          <ellipse cx='52' cy='66' rx='32' ry='26' className={s.fur} />
          <rect
            x='62'
            y='70'
            width='11'
            height='26'
            rx='4.5'
            className={s.fur}
          />
          <rect x='73' y='72' width='10' height='24' rx='4' className={s.fur} />
          <circle cx='84' cy='34' r='16' className={s.fur} />
          <path d='M 73 24 L 77 8 L 86 21 Z' className={s.fur} />
          <path
            d='M 87 21 L 96 9 L 98 25 Z'
            className={[s.fur, s.ear].join(' ')}
          />
          <ellipse cx='79' cy='33' rx='2.4' ry='3.4' className={s.eye} />
          <ellipse cx='90' cy='33' rx='2.4' ry='3.4' className={s.eye} />
          <g className={s.whiskers}>
            <path d='M 96 40 L 112 38' />
            <path d='M 96 43 L 112 44' />
          </g>
        </svg>
      </div>
      <span className={s.shadow} />
    </div>
  );
};
