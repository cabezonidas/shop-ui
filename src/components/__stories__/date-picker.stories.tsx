// tslint:disable: jsx-use-translation-function
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Form, Label, Box, DatePicker, Calendar } from "..";
import { DateTime } from "luxon";

storiesOf("DatePicker", module).add("Variants", () => <MyStory />);

const MyStory = () => {
  const [day1, setDay1] = React.useState(DateTime.local());
  const [day2, setDay2] = React.useState<DateTime>();
  return (
    <Form margin="2" width="650px" display="grid" gridGap="2">
      <Box>
        <Label htmlFor="date">Date</Label>
        <DatePicker id="date" day={day1} onDaySelect={setDay1} />
      </Box>
      <Box>
        <Label htmlFor="date-time">Date and time</Label>
        <DatePicker id="date-time" day={day2} onDaySelect={setDay2} />
      </Box>
    </Form>
  );
};
