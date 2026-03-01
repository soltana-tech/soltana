import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

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

function SortIcon({ className }: { className: string }) {
  return (
    <svg
      className={`cfm-sort-icon ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M11 5h10" />
      <path d="M11 9h7" />
      <path d="M11 13h4" />
      <path d="M3 17l3 3 3-3" />
      <path d="M6 18V4" />
    </svg>
  );
}

export function CfmTimeline() {
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    if (typeof window === 'undefined') return 'lesson';
    const saved = localStorage.getItem('soltana-view-mode');
    return saved === 'chronological' ? 'chronological' : 'lesson';
  });

  const { isDayRead, toggleDay } = useReadingProgress();
  const currentWeek = useMemo(() => getCurrentWeekNumber(weeks), []);

  const [sortFabVisible, setSortFabVisible] = useState(false);
  const [scrollFabVisible, setScrollFabVisible] = useState(false);

  const theadRef = useRef<HTMLTableSectionElement>(null);

  const toggleViewMode = useCallback(() => {
    setViewMode((prev) => {
      const next = prev === 'lesson' ? 'chronological' : 'lesson';
      localStorage.setItem('soltana-view-mode', next);
      return next;
    });
  }, []);

  const scrollToCurrentWeek = useCallback(() => {
    document
      .querySelector(`[data-week="${currentWeek}"]`)
      ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [currentWeek]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollFabVisible(window.scrollY > 100);
      if (theadRef.current) {
        setSortFabVisible(theadRef.current.getBoundingClientRect().bottom <= 0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Lazy-load row background images as they scroll into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const src = el.dataset.bgImage;
            if (src) {
              el.style.backgroundImage = `url(${src})`;
              el.classList.add('lazy-loaded');
              observer.unobserve(el);
            }
          }
        }
      },
      { rootMargin: '200px' }
    );

    document.querySelectorAll('.cfm-week-bg[data-bg-image]').forEach((el) => {
      observer.observe(el);
    });
    return () => {
      observer.disconnect();
    };
  }, []);

  const sortIconClass = viewMode === 'lesson' ? 'sort-lesson' : 'sort-chrono';
  const sortTooltip =
    viewMode === 'lesson' ? 'Switch to Chronological Order' : 'Switch to Lesson Order';

  return (
    <div className="cfm-timeline">
      <button
        className={`cfm-scroll-fab${scrollFabVisible ? ' visible' : ''}`}
        onClick={scrollToCurrentWeek}
        aria-label="Scroll to current week"
      >
        <svg
          className="cfm-scroll-arrow"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
        <span className="cfm-scroll-label">Current Week</span>
      </button>

      <button
        className={`cfm-sort-fab${sortFabVisible ? ' visible' : ''}`}
        onClick={toggleViewMode}
        aria-label="Toggle reading order"
      >
        <SortIcon className={sortIconClass} />
        <span className="cfm-sort-fab-label">Sort</span>
        <span className="cfm-sort-fab-tooltip">{sortTooltip}</span>
      </button>

      <div className="cfm-table-wrap">
        <div className="cfm-scroll">
          <table className="cfm-table" aria-label="Old Testament study timeline table">
            <thead ref={theadRef}>
              <tr>
                <th>Week</th>
                <th>Come, Follow Me (OT 2026)</th>
                <th>
                  <div className="cfm-reading-header">
                    <button
                      className="cfm-sort-btn"
                      onClick={toggleViewMode}
                      aria-label="Toggle reading order"
                    >
                      <SortIcon className={sortIconClass} />
                      <span className="cfm-sort-tooltip">{sortTooltip}</span>
                    </button>
                    <span>Daily Reading</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
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
            </tbody>
          </table>
        </div>
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
    <tr
      data-week={week.week}
      data-week-start={week.startDate}
      data-week-end={week.endDate}
      className={isCurrent ? 'current-week' : undefined}
    >
      <td className="col-week">
        {week.cfm.image && (
          <span className="cfm-week-bg" data-bg-image={week.cfm.image} aria-hidden="true" />
        )}
        <span className="cfm-row-overlay" aria-hidden="true" />
        <div className="cfm-weeknum">{formatWeekNumber(week.week)}</div>
        <div className="cfm-dates">{week.dateLabel}</div>
      </td>

      <td className="col-cfm">
        <a href={week.cfm.link} target="_blank" rel="noopener noreferrer">
          &ldquo;{week.cfm.title}&rdquo;
        </a>
        <div className="cfm-reading">{week.cfm.reading}</div>
        {week.cfm.excerpt && (
          <div className="cfm-excerpt">
            <span className="cfm-excerpt-text">{week.cfm.excerpt}</span>
            <a
              href={week.cfm.link}
              target="_blank"
              rel="noopener noreferrer"
              className="cfm-excerpt-more"
            >
              See more
            </a>
          </div>
        )}
      </td>

      <td className="col-readings">
        <div className="cfm-day-buttons">
          {dailyReadings.map((reading, dayIndex) => {
            const isEmpty = reading === '';
            const isRead = isDayRead(week.week, dayIndex);

            return (
              <button
                key={dayIndex}
                className={`cfm-day-btn${isRead ? ' read' : ''}${isEmpty ? ' empty' : ''}`}
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
      </td>
    </tr>
  );
}
