import React, { useEffect, useRef, useState } from 'react';
import { useMysticEnabled } from '../../hooks/useMysticEnabled';
import s from './MysticLayer.module.scss';

let starCounter = 0;

interface IFallingStar {
  id: number;
  left: number; // % ширины
  top: number; // % высоты
  angle: number; // наклон полёта
  duration: number; // секунд
}

// фоновый слой атмосферы: параллакс звёзд за курсором, туман у пола,
// свечи по углам и изредка падающая звезда. Ничего не ловит клики.
export const MysticLayer: React.FC = () => {
  const enabled = useMysticEnabled();
  const [stars, setStars] = useState<IFallingStar[]>([]);
  const farRef = useRef<HTMLDivElement>(null);
  const nearRef = useRef<HTMLDivElement>(null);

  // параллакс: слои уезжают от курсора с разной скоростью — глубина
  useEffect(() => {
    if (!enabled) return undefined;

    const onMove = (e: MouseEvent) => {
      const dx = e.clientX / window.innerWidth - 0.5;
      const dy = e.clientY / window.innerHeight - 0.5;
      if (farRef.current) {
        farRef.current.style.transform = `translate(${dx * -10}px, ${dy * -10}px)`;
      }
      if (nearRef.current) {
        nearRef.current.style.transform = `translate(${dx * -24}px, ${dy * -24}px)`;
      }
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [enabled]);

  // раз в 9–30 секунд по небу проносится звезда
  useEffect(() => {
    if (!enabled) return undefined;
    let next: number;

    const schedule = () => {
      next = window.setTimeout(
        () => {
          const star: IFallingStar = {
            id: (starCounter += 1),
            left: 10 + Math.random() * 62,
            top: 4 + Math.random() * 20,
            angle: 18 + Math.random() * 16,
            duration: 0.8 + Math.random() * 0.5,
          };
          setStars((prev) => [...prev, star]);
          window.setTimeout(
            () => setStars((prev) => prev.filter((st) => st.id !== star.id)),
            star.duration * 1000 + 400
          );
          schedule();
        },
        9000 + Math.random() * 21000
      );
    };
    schedule();

    return () => window.clearTimeout(next);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className={s.layer} aria-hidden='true'>
      <div ref={farRef} className={[s.parallax, s.far].join(' ')} />
      <div ref={nearRef} className={[s.parallax, s.near].join(' ')} />
      <div className={s.fog} />

      <div className={[s.candle, s.candleLeft].join(' ')}>
        <span className={s.flame} />
        <span className={s.wick} />
        <span className={s.body} />
      </div>
      <div className={[s.candle, s.candleRight].join(' ')}>
        <span className={s.flame} />
        <span className={s.wick} />
        <span className={s.body} />
      </div>

      {stars.map((st) => (
        <span
          key={st.id}
          className={s.shootingStar}
          style={{
            left: `${st.left}%`,
            top: `${st.top}%`,
            transform: `rotate(${st.angle}deg)`,
            animationDuration: `${st.duration}s`,
          }}
        />
      ))}
    </div>
  );
};
