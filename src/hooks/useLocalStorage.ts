'use client';

import { useState, useCallback, useEffect } from 'react';
import { getFromStorage, saveToStorage, removeFromStorage } from '@/utils/localStorage';

/**
 * Hook genérico para sincronizar estado React con localStorage.
 * @param key   Clave de localStorage
 * @param init  Valor inicial si no existe en LS
 */
export function useLocalStorage<T>(key: string, init: T) {
  const [value, setValueState] = useState<T>(() => {
    const stored = getFromStorage<T>(key);
    return stored !== null ? stored : init;
  });

  const setValue = useCallback(
    (newVal: T | ((prev: T) => T)) => {
      setValueState((prev) => {
        const resolved = typeof newVal === 'function'
          ? (newVal as (prev: T) => T)(prev)
          : newVal;
        saveToStorage(key, resolved);
        return resolved;
      });
    },
    [key],
  );

  const remove = useCallback(() => {
    removeFromStorage(key);
    setValueState(init);
  }, [key, init]);

  // Sincronizar si otra pestaña cambia el mismo key
  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setValueState(JSON.parse(e.newValue) as T);
        } catch {
          // ignorar si no es JSON válido
        }
      }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, [key]);

  return [value, setValue, remove] as const;
}