import "./App.css";
import * as localforage from "localforage";
import Picker from "./components/Picker";
import Schedule from "./components/Schedule";
import type { ScheduleStore } from "./types";

// localforage.setItem("schedule", {
//   id: "regular",
//   completeOn: new Date(2023, 11, 13),
//   average: 30,
// });

function App() {
  const getSchedule: () => Promise<ScheduleStore | null> = async () => {
    return await localforage.getItem("schedule");
  };

  const [schedule] = createResource<ScheduleStore | null>(getSchedule);

  return (
    <div>
      <Show when={!schedule() && !schedule.loading}>
        <Picker />
      </Show>
      <Show when={schedule()}>
        <Schedule scheduleStore={schedule} />
      </Show>
    </div>
  );
}

export default App;
