/**
 * Groups consecutive chapters into ranges for compact display.
 * e.g. ["Genesis 1", "Genesis 2", "Genesis 3"] -> "Genesis 1-3"
 */
export function formatChapters(chapters: string[]): string {
  if (chapters.length === 0) return '';
  if (chapters.length === 1) return chapters[0];

  const bookGroups = new Map<string, number[]>();
  const chapterRegex = /^(.+?)\s+(\d+)$/;

  for (const chapter of chapters) {
    const match = chapterRegex.exec(chapter);
    if (match) {
      const book = match[1];
      const num = parseInt(match[2], 10);
      const existing = bookGroups.get(book);
      if (existing) {
        existing.push(num);
      } else {
        bookGroups.set(book, [num]);
      }
    }
  }

  const parts: string[] = [];

  for (const [book, nums] of bookGroups) {
    nums.sort((a, b) => a - b);
    const ranges = buildRanges(nums);
    parts.push(`${book} ${ranges}`);
  }

  return parts.join('; ');
}

function buildRanges(nums: number[]): string {
  const ranges: string[] = [];
  let start = nums[0];
  let end = nums[0];

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === end + 1) {
      end = nums[i];
    } else {
      ranges.push(formatRange(start, end));
      start = nums[i];
      end = nums[i];
    }
  }
  ranges.push(formatRange(start, end));

  return ranges.join(', ');
}

function formatRange(start: number, end: number): string {
  return start === end ? String(start) : `${String(start)}-${String(end)}`;
}

/**
 * Distributes chapters sequentially across 7 days.
 * Earlier days receive extra chapters when not evenly divisible.
 */
export function distributeAcrossDays(chapters: string[]): string[][] {
  const days: string[][] = [[], [], [], [], [], [], []];
  const total = chapters.length;

  if (total === 0) return days;

  const base = Math.floor(total / 7);
  const extra = total % 7;

  let idx = 0;
  for (let day = 0; day < 7; day++) {
    const count = base + (day < extra ? 1 : 0);
    for (let i = 0; i < count; i++) {
      days[day].push(chapters[idx++]);
    }
  }

  return days;
}
