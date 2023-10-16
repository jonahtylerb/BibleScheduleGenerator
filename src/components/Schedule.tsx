import type { Component, Resource } from "solid-js";
import type {
  BibleRange,
  BibleRef,
  ScheduleStore,
  Schedule as ScheduleType,
} from "../types";
import schedules from "../assets/schedules";
import bibleData from "../bible.json";

const totalVerses = 31102;
// TODO: Add completed verses to calculation
const calculateVersesPerDay = (finishOn: Date) => {
  const diff = finishOn.getTime() - Date.now();
  const msInDay = 24 * 60 * 60 * 1000;
  const daysLeft = Math.ceil(diff / msInDay);
  return Math.ceil(totalVerses / daysLeft);
};

const getChapterLength = (ref: BibleRef) => {
  return +bibleData[ref.book - 1].chapters[ref.chapter - 1];
};

const Schedule: Component<{ scheduleStore: Resource<ScheduleStore> }> = (
  props
) => {
  const schedule = schedules.find((schedule: ScheduleType) => {
    return schedule.id === props.scheduleStore()?.name;
  });

  const versesPerDay = calculateVersesPerDay(props.scheduleStore()!.completeOn);

  const [rangesForDays, setRangesForDays] = createSignal<BibleRange[]>([]);

  let verses = totalVerses;
  let curRange: BibleRange;

  while (verses > 0) {
    let to: BibleRef = {
      book: 1,
      chapter: 1,
      verse: 1,
    };

    if (versesPerDay > getChapterLength(to)) {
      to.chapter++;
    }

    curRange = {
      from: {
        book: 1,
        chapter: 1,
        verse: 1,
      },
      to: to,
    };
  }

  return (
    <section>
      <For each={rangesForDays()}>
        {(bibleRange) => <div>{bibleRange.to.book}</div>}
      </For>
    </section>
  );
};

export default Schedule;
