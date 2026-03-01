import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'soltana-read-days';

function createDayId(weekNumber: number, dayIndex: number): string {
  const weekPadded = weekNumber.toString().padStart(2, '0');
  return `day-w${weekPadded}-d${String(dayIndex + 1)}`;
}

function loadFromStorage(): Set<string> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return new Set(JSON.parse(stored) as string[]);
    }
  } catch {
    // Storage unavailable (SSR or private browsing)
  }
  return new Set();
}

function saveToStorage(readDays: Set<string>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...readDays]));
  } catch {
    // Storage unavailable
  }
}

/**
 * Manages reading progress state with localStorage persistence.
 */
export function useReadingProgress() {
  const [readDays, setReadDays] = useState<Set<string>>(new Set());

  useEffect(() => {
    setReadDays(loadFromStorage());
  }, []);

  const isDayRead = useCallback(
    (weekNumber: number, dayIndex: number): boolean => {
      return readDays.has(createDayId(weekNumber, dayIndex));
    },
    [readDays]
  );

  const toggleDay = useCallback((weekNumber: number, dayIndex: number): void => {
    setReadDays((prev) => {
      const next = new Set(prev);
      const dayId = createDayId(weekNumber, dayIndex);
      if (next.has(dayId)) {
        next.delete(dayId);
      } else {
        next.add(dayId);
      }
      saveToStorage(next);
      return next;
    });
  }, []);

  return { isDayRead, toggleDay };
}
