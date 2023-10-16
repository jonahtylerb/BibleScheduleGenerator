import { css } from "solid-styled";
import { ScheduleStore } from "../types";
import localforage from "localforage";

const Picker = () => {
  const [schedule, setSchedule] = createSignal({} as ScheduleStore);

  const setScheduleName = (e: Event) => {
    const input = e.target as HTMLSelectElement;
    setSchedule((schedule) => {
      schedule.name = input.value;
      return schedule;
    });
  };

  const setScheduleCompletion = (e: Event) => {
    const input = e.target as HTMLInputElement;
    const [year, month, day] = input.value.split("-");
    setSchedule((schedule) => {
      schedule.completeOn = new Date(+year, +month - 1, +day);
      console.log(schedule);
      return schedule;
    });
  };

  const saveSchedule = async (e: Event) => {
    e.preventDefault();
    await localforage.setItem("schedule", schedule());
    window.location.reload();
  };

  css`
    form {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      background: var(--gray-8);
      padding: var(--size-5);
      box-shadow: var(--shadow-3);
      width: 90%;
      max-width: 100rem;
      border-radius: var(--radius-2);
      gap: var(--size-3);
    }

    label {
      font-size: var(--font-size-3);
    }
  `;

  return (
    <form onSubmit={saveSchedule}>
      <h2>Make a Schedule</h2>
      {/* TODO: Make this get schedules*/}
      <label for="schedule">Schedule Type</label>
      <select id="schedule" name="schedule" onChange={setScheduleName}>
        <option selected disabled>
          Pick a reading schedule
        </option>
        <option value="regular">
          Sequintal
          {/* TODO: Learn how to spell*/}
        </option>
      </select>
      <label>Complete On</label>
      <input id="date" type="date" required onInput={setScheduleCompletion} />
      <button type="submit">Generate</button>
    </form>
  );
};

export default Picker;
