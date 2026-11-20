import { useEffect, useState } from 'react';

// мистические эффекты живут только на десктопе (на мобильных — тишина)
// и только если пользователь не просил систему об экономии движения
const QUERY = '(min-width: 992px) and (prefers-reduced-motion: no-preference)';

export const useMysticEnabled = (): boolean => {
  const [enabled, setEnabled] = useState<boolean>(() => {
    if (typeof window.matchMedia !== 'function') return false;
    return window.matchMedia(QUERY).matches;
  });

  useEffect(() => {
    const mql = window.matchMedia(QUERY);
    const onChange = () => setEnabled(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return enabled;
};
