import { useState } from 'react';
import { saveLocalStorage, readLocalStorage } from '../utilities/utils';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState(() => {
    return readLocalStorage<T>(key) || initialValue;
  });

  const setValue = (value: T) => {
    const valueToStore = typeof value === 'function' ? value(storedValue) : value;
    saveLocalStorage(key, valueToStore);
    setStoredValue(valueToStore);
  };

  return [storedValue, setValue];
}
