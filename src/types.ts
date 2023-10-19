export type Book = {
  abbr: string;
  book: string;
  chapters: number[];
};

export type ScheduleStore = Date;

export type BibleRef = {
  book: number;
  chapter: number;
  verse: number;
};

export type BibleRange = {
  from: BibleRef;
  to: BibleRef;
};
