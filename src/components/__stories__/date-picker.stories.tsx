// tslint:disable: jsx-use-translation-function
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Form, Label, Box, DatePicker, Checkbox, Select, Option } from "..";
import { DateTime, Interval } from "luxon";
import { soonestAvailable } from "../..";

storiesOf("DatePicker", module).add("Variants", () => <MyStory />);

const day1 = DateTime.local()
  .startOf("day")
  .minus({ days: 1 });
const day2 = day1.plus({ days: 1 }).set({ hour: 9 });
const day3 = day2.plus({ days: 2 }).set({ hour: 6 });
const day4 = day3.plus({ days: 3 }).set({ hour: 12 });
const day5 = day4.plus({ days: 8 }).set({ hour: 7 });

const allowedIntervals = [
  Interval.after(day1.plus({ hours: 8 }), { hours: 2 }),
  Interval.after(day1.plus({ hours: 16 }), { hours: 4 }),
  Interval.after(day2, { hours: 4 }),
  Interval.after(day2.plus({ hours: 6 }), { hours: 2 }),
  Interval.after(day3, { hours: 6 }),
  Interval.after(day3.plus({ hours: 8 }), { hours: 4 }),
  Interval.after(day4, { hours: 5 }),
  Interval.after(day5, { hours: 6 }),
  Interval.after(day5.plus({ hours: 8 }), { hours: 4 }),
];

const MyStory = () => {
  const [mode, setMode] = React.useState<"day" | "date-time" | "time">("time");
  const [steps, setSteps] = React.useState<15 | 30 | 60 | 120>(60);
  const [restrictions, setRestrictions] = React.useState(true);
  const [day, setDay] = React.useState<DateTime | undefined>(
    soonestAvailable(true, steps, allowedIntervals)
  );

  return (
    <Form margin="2" width="400px">
      <Box display="grid" gridTemplateColumns={"repeat(3, 1fr)"}>
        <Box>
          <Label htmlFor="date-time">DateTime</Label>
          <Checkbox
            id="date-time"
            checked={mode === "date-time"}
            onChange={() => setMode("date-time")}
          />
        </Box>
        <Box>
          <Label htmlFor="day">Day</Label>
          <Checkbox id="day" checked={mode === "day"} onChange={() => setMode("day")} />
        </Box>
        <Box>
          <Label htmlFor="time">Time</Label>
          <Checkbox id="time" checked={mode === "time"} onChange={() => setMode("time")} />
        </Box>
      </Box>
      <Box>
        <Label htmlFor="restrictions">Allowed Intervals</Label>
        <Checkbox
          id="restrictions"
          checked={restrictions}
          onChange={() => setRestrictions(r => !r)}
        />
      </Box>
      <Box>
        <Label htmlFor="steps">Steps</Label>
        <Select id="steps" value={steps} onChange={e => setSteps(Number(e.target.value) as any)}>
          <Option value={15}>15</Option>
          <Option value={30}>30</Option>
          <Option value={60}>60</Option>
          <Option value={120}>120</Option>
        </Select>
      </Box>
      <Box>
        <Label htmlFor="date-input">Date Input</Label>
        <DatePicker
          id="date-input"
          day={day}
          onDaySelect={setDay}
          allowedIntervals={restrictions ? allowedIntervals : undefined}
          mode={mode}
          minutesInterval={steps}
        />
      </Box>
    </Form>
  );
};
