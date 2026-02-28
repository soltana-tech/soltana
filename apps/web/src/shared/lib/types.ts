export interface CfmLesson {
  title: string;
  link: string;
  reading: string;
  excerpt?: string;
  image?: string;
}

export interface Week {
  week: number;
  startDate: string;
  endDate: string;
  dateLabel: string;
  cfm: CfmLesson;
  chapters: string[];
}

export type ViewMode = 'lesson' | 'chronological';
