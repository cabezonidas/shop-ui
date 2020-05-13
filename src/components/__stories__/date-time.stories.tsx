// tslint:disable: jsx-use-translation-function
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Form, Label, Box } from "..";
import { DateTime } from "../date-time";

storiesOf("DateTime", module).add("Variants", () => <MyStory />);

const MyStory = () => {
  return (
    <Form margin="2" width="350px" display="grid" gridGap="2">
      <Box>
        <Label htmlFor="date">Date</Label>
        <DateTime id="date" time={false} onChange={e => console.log(e)} />
      </Box>
      <Box>
        <Label htmlFor="date-time">Date and time</Label>
        <DateTime id="date-time" time={true} onChange={e => console.log(e)} />
      </Box>
    </Form>
  );
};
