// tslint:disable: jsx-use-translation-function
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Form, Label, Input, Box, File, Select, Option, Checkbox, Toggle } from "..";

storiesOf("Controls", module).add("Form controls", () => <MyStory />);

const MyStory = () => {
  return (
    <Form margin="2" width="350px" display="grid" gridGap="2">
      <Box>
        <Label htmlFor="input">Input</Label>
        <Input id="input" onChange={e => console.log(e)} />
      </Box>
      <Box>
        <Label htmlFor="select">Select</Label>
        <Select id="select">
          <Option value="1">Option 1</Option>
          <Option value="2">Option 2</Option>
        </Select>
      </Box>
      <Box>
        <Label htmlFor="checkbox">Checkbox</Label>
        <Checkbox id="checkbox" onChange={e => console.log(e)} />
      </Box>
      <Box>
        <Label htmlFor="file">File</Label>
        <File id="file" onChange={e => console.log(e)} />
      </Box>
      <Box>
        <Label htmlFor="toggle">Toggle</Label>
        <Toggle id="toggle" onChange={e => console.log(e)} />
      </Box>
      <Box>
        <Label htmlFor="select">Select</Label>
        <Select id="select" onChange={e => console.log(e)} />
      </Box>
    </Form>
  );
};
