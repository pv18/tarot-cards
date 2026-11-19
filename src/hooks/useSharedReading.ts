import { useCallback, useState } from 'react';
import { type IReading } from '../types/types';
import { decodeReading } from '../utils/share';

/** Расклад, присланный по ссылке; clear убирает его из адреса и состояния */
export const useSharedReading = (): [IReading | null, () => void] => {
  const [shared, setShared] = useState<IReading | null>(() => {
    const decoded = decodeReading(window.location.hash);
    return decoded ? { ...decoded, id: 'shared' } : null;
  });

  const clear = useCallback(() => {
    window.history.replaceState(null, '', window.location.pathname);
    setShared(null);
  }, []);

  return [shared, clear];
};
