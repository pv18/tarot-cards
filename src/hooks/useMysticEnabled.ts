import { useEffect, useState } from 'react';

// мистические эффекты живут только на десктопе (на мобильных — тишина)
// и только если пользователь не просил систему об экономии движения.
// Считаем условия напрямую и на resize, и на change медиа-запроса —
// так надёжнее в браузерах с нестандартной эмуляцией вьюпорта
const MIN_WIDTH = 992;

const isMysticAllowed = (): boolean => {
  if (typeof window.matchMedia !== 'function') return false;
  return (
    window.innerWidth >= MIN_WIDTH &&
    window.matchMedia('(prefers-reduced-motion: no-preference)').matches
  );
};

export const useMysticEnabled = (): boolean => {
  const [enabled, setEnabled] = useState<boolean>(isMysticAllowed);

  useEffect(() => {
    const onChange = () => setEnabled(isMysticAllowed());
    window.addEventListener('resize', onChange);
    const motion = window.matchMedia('(prefers-reduced-motion: no-preference)');
    motion.addEventListener('change', onChange);
    return () => {
      window.removeEventListener('resize', onChange);
      motion.removeEventListener('change', onChange);
    };
  }, []);

  return enabled;
};
