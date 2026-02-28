import { useMemo, useState } from 'react';

import { useReadingProgress } from '~/shared/hooks/useReadingProgress';
import type { ViewMode, Week } from '~/shared/lib/types';
import { distributeAcrossDays, formatChapters } from '~/shared/lib/utils/chapterFormatter';
import { formatWeekNumber, getCurrentWeekNumber } from '~/shared/lib/utils/dates';
import chronologicalOrderData from '~/study-plans/data/chronologicalOrder.json';
import weeksData from '~/study-plans/data/weeks.json';

const weeks = weeksData as Week[];

const chronoIndexMap = new Map<string, number>();
(chronologicalOrderData as { itemListElement: (string | string[])[] }).itemListElement.forEach(
  (item, index) => {
    if (Array.isArray(item)) {
      for (const chapter of item) {
        chronoIndexMap.set(chapter, index);
      }
    } else {
      chronoIndexMap.set(item, index);
    }
  }
);

function getDailyReadings(week: Week, viewMode: ViewMode): string[] {
  const chapters =
    viewMode === 'lesson'
      ? week.chapters
      : [...week.chapters].sort(
          (a, b) => (chronoIndexMap.get(a) ?? Infinity) - (chronoIndexMap.get(b) ?? Infinity)
        );

  return distributeAcrossDays(chapters).map(formatChapters);
}

export function CfmTimeline() {
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    if (typeof window === 'undefined') return 'lesson';
    const saved = localStorage.getItem('soltana-view-mode');
    return saved === 'chronological' ? 'chronological' : 'lesson';
  });

  const { isDayRead, toggleDay } = useReadingProgress();

  const currentWeek = useMemo(() => getCurrentWeekNumber(weeks), []);

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
    localStorage.setItem('soltana-view-mode', mode);
  };

  return (
    <div className="cfm-timeline">
      <div className="cfm-controls">
        <h1>Come, Follow Me 2026 OT</h1>
        <div className="cfm-view-toggle">
          <button
            className={`cfm-view-btn${viewMode === 'lesson' ? ' active' : ''}`}
            onClick={() => {
              handleViewModeChange('lesson');
            }}
          >
            Lesson Order
          </button>
          <button
            className={`cfm-view-btn${viewMode === 'chronological' ? ' active' : ''}`}
            onClick={() => {
              handleViewModeChange('chronological');
            }}
          >
            Chronological
          </button>
        </div>
      </div>

      <div className="cfm-weeks">
        {weeks.map((week) => (
          <WeekRow
            key={week.week}
            week={week}
            viewMode={viewMode}
            isCurrent={week.week === currentWeek}
            isDayRead={isDayRead}
            toggleDay={toggleDay}
          />
        ))}
      </div>
    </div>
  );
}

interface WeekRowProps {
  week: Week;
  viewMode: ViewMode;
  isCurrent: boolean;
  isDayRead: (weekNumber: number, dayIndex: number) => boolean;
  toggleDay: (weekNumber: number, dayIndex: number) => void;
}

function WeekRow({ week, viewMode, isCurrent, isDayRead, toggleDay }: WeekRowProps) {
  const dailyReadings = useMemo(() => getDailyReadings(week, viewMode), [week, viewMode]);

  const dayOfYearBase = (week.week - 1) * 7;

  return (
    <div className={`cfm-week${isCurrent ? ' current' : ''}`}>
      <div className="cfm-week-meta">
        <span className="cfm-weeknum">{formatWeekNumber(week.week)}</span>
        <span className="cfm-dates">{week.dateLabel}</span>
      </div>

      <div className="cfm-lesson-info">
        <a href={week.cfm.link} target="_blank" rel="noopener noreferrer">
          &ldquo;{week.cfm.title}&rdquo;
        </a>
        <div className="cfm-reading">{week.cfm.reading}</div>
        {week.cfm.excerpt && <div className="cfm-excerpt">{week.cfm.excerpt}</div>}
      </div>

      <div className="cfm-day-buttons">
        {dailyReadings.map((reading, dayIndex) => {
          const isEmpty = reading === '';
          const isRead = isDayRead(week.week, dayIndex);

          return (
            <button
              key={dayIndex}
              className={`cfm-day-btn${isRead ? ' read' : ''}`}
              disabled={isEmpty}
              onClick={() => {
                toggleDay(week.week, dayIndex);
              }}
              aria-pressed={isRead}
            >
              <span className="cfm-day-label">Day {dayOfYearBase + dayIndex + 1}</span>
              <span className={`cfm-day-reading${isEmpty ? ' empty' : ''}`}>
                {isEmpty ? 'No reading' : reading}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
