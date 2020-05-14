// tslint:disable: jsx-use-translation-function
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Form, Label, Box, DatePicker, Calendar } from "..";
import { DateTime, Interval } from "luxon";

storiesOf("DatePicker", module).add("Variants", () => <MyStory />);

const MyStory = () => {
  const [day1, setDay1] = React.useState(DateTime.local());
  const [day2, setDay2] = React.useState<DateTime>();
  const [day3, setDay3] = React.useState(DateTime.local());
  const allowedIntervals = [Interval.after(day1.minus({ days: 5 }), { days: 10 })];
  return (
    <Form margin="2" width="650px" display="grid" gridGap="2">
      <Box>
        <Label htmlFor="date1">Date</Label>
        <DatePicker id="date1" day={day1} onDaySelect={setDay1} />
      </Box>
      <Box>
        <Label htmlFor="date2">Date (empty)</Label>
        <DatePicker id="date2" day={day2} onDaySelect={setDay2} />
      </Box>
      <Box>
        <Label htmlFor="date3">Allowed Intervals</Label>
        <DatePicker
          id="date3"
          day={day3}
          onDaySelect={setDay3}
          allowedIntervals={allowedIntervals}
        />
      </Box>
    </Form>
  );
};
