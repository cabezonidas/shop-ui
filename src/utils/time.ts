import { MinutesInterval } from "../components/calendar";
import { Interval, DateTime } from "luxon";

export const timeslots = (day: DateTime, minutesInterval: MinutesInterval) => {
  const startOfDay = day.startOf("day");
  return [...Array(1440 / minutesInterval)].map((_, cell) =>
    startOfDay.plus({ minutes: minutesInterval * cell })
  );
};

export const soonestAvailable = (
  fromNow: boolean,
  minutesInterval: MinutesInterval,
  allowedIntervals?: Interval[]
) => {
  const now = DateTime.local();
  if (!allowedIntervals) {
    const newAllowedTime = DateTime.local().startOf("minute");
    const offset = newAllowedTime.minute % minutesInterval;
    return offset ? newAllowedTime.plus({ minutes: minutesInterval - offset }) : newAllowedTime;
  }

  const minDate = allowedIntervals.sort((a, b) => (a.start > b.start ? 1 : -1))[0]?.start;
  const maxDate = allowedIntervals.sort((a, b) => (a.end < b.end ? 1 : -1))[0]?.end;

  if (minDate && maxDate) {
    const days = Math.ceil(maxDate.diff(minDate, "days").toObject().days ?? 1);
    const daysIntervals = [...Array(days)].map((_, d) =>
      timeslots(minDate.startOf("day").plus({ days: d }), minutesInterval)
    );
    let soonest: DateTime | undefined;
    for (const daysInt of daysIntervals) {
      soonest = daysInt
        .filter(t => (fromNow ? t > now : true))
        .find(t => allowedIntervals.find(ai => ai.contains(t)));
      if (soonest) {
        break;
      }
    }
    return soonest;
  }
};
