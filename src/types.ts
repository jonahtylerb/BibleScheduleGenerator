export type Book = {
  abbr: string;
  book: string;
  chapters: number[];
};

export type ScheduleStore = {
  name: string;
  completeOn: Date;
  avrage: number;
};

export type BibleRef = {
  book: number;
  chapter: number;
  verse: number;
};

export type BibleRange = {
  from: BibleRef;
  to: BibleRef;
};

export type Schedule = {
  id: ScheduleStore["name"];
  data: BibleRange[];
};
