import { type Component, type Resource } from "solid-js";
import type { BibleRange, BibleRef, ScheduleStore } from "../types";
import bibleData from "../bibleData";

const totalVerses = bibleData.reduce((sum, book) => {
  return (
    sum +
    book.chapters.reduce((sum, chapter) => {
      return sum + chapter;
    }, 0)
  );
}, 0);

const getBookName = (book: number) => {
  return bibleData[book - 1].book;
};

// TODO: Add completed verses to calculation
const calculateVersesPerDay = (finishOn: Date) => {
  const diff = finishOn.getTime() - Date.now();
  const msInDay = 24 * 60 * 60 * 1000;
  const daysLeft = Math.ceil(diff / msInDay);
  return Math.ceil(totalVerses / daysLeft);
};

const getChapterLength = (ref: BibleRef) => {
  return bibleData[ref.book - 1].chapters[ref.chapter - 1];
};

const createDay = (versesPerDay: number, prevDay: BibleRange) => {
  let day: BibleRange = {
    from: structuredClone(prevDay.to),
    to: structuredClone(prevDay.to),
  };

  versesPerDay += day.to.verse;

  while (versesPerDay > 0) {
    if (getChapterLength(day.to)) {
      if (versesPerDay > getChapterLength(day.to)) {
        versesPerDay -= getChapterLength(day.to);
        day.to.chapter++;
        day.to.verse = 1;
      } else {
        day.to.verse = versesPerDay;
        versesPerDay = 0;
      }
    } else {
      day.to.book++;
      day.to.chapter = 1;
      if (day.to.book > 66) {
        day.to = {
          book: 66,
          chapter: 22,
          verse: 21,
        };
        versesPerDay = 0;
      }
    }
  }
  console.log(day);

  return day;
};

const Schedule: Component<{ scheduleStore: Resource<ScheduleStore> }> = (
  props,
) => {
  const versesPerDay = calculateVersesPerDay(props.scheduleStore()!);

  const [allDays, setAllDays] = createSignal<BibleRange[]>([]);

  let allVerses = totalVerses;

  let days = [];
  let prevDay = {
    from: {
      book: 1,
      chapter: 1,
      verse: 1,
    },
    to: {
      book: 1,
      chapter: 1,
      verse: 1,
    },
  };
  while (allVerses > 0) {
    allVerses -= versesPerDay;

    let day = createDay(versesPerDay, prevDay);

    days.push(day);
    prevDay = day;
  }

  setAllDays(days);
  console.log(days);

  return (
    <section>
      <For each={allDays()}>
        {(day) => (
          <section style="display: flex; gap: 1rem; justify-content: center">
            <div style="gap: 0.25rem; display: flex">
              <span>{getBookName(day.from.book)}</span>
              <span>
                {day.from.chapter}:{day.from.verse}
              </span>
            </div>
            -
            <div style="gap: 0.25rem; display: flex">
              <span>{getBookName(day.to.book)}</span>
              <span>
                {day.to.chapter}:{day.to.verse}
              </span>
            </div>
          </section>
        )}
      </For>
    </section>
  );
};

export default Schedule;
