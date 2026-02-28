import type { Week } from '~/shared/lib/types';

function parseDate(dateStr: string): Date {
  return new Date(dateStr + 'T00:00:00');
}

export function getCurrentWeekNumber(weeks: Week[]): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (const week of weeks) {
    const start = parseDate(week.startDate);
    const end = new Date(week.endDate + 'T23:59:59');
    if (today >= start && today <= end) {
      return week.week;
    }
  }

  const firstStart = parseDate(weeks[0].startDate);
  return today < firstStart ? 1 : 52;
}

export function formatWeekNumber(week: number): string {
  return `Week ${week.toString().padStart(2, '0')}`;
}
