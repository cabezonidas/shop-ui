// tslint:disable: jsx-use-translation-function
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Form, Label, Input, Box, File, Checkbox, Select, Option, Toggle } from "..";
import Alert from "../alert";
import TextArea from "../text-area";

storiesOf("Alerts", module).add("Variants", () => <MyStory />);

const MyStory = () => {
  return (
    <Form margin="2" width="350px">
      <Box>
        <Label htmlFor="input">Input</Label>
        <Input id="input" onChange={e => console.log(e)} />
        <Alert variant="primary">This is an alert</Alert>
      </Box>
      <Box>
        <Label htmlFor="select">Select</Label>
        <Select id="select">
          <Option value="1">Option 1</Option>
          <Option value="2">Option 2</Option>
        </Select>
        <Alert variant="default">This is an alert</Alert>
      </Box>
      <Box>
        <Label htmlFor="checkbox">Checkbox</Label>
        <Checkbox id="checkbox" onChange={e => console.log(e)} />
        <Alert variant="info">This is an alert</Alert>
      </Box>
      <Box>
        <Label htmlFor="textarea">Text Area</Label>
        <TextArea id="textarea" onChange={e => console.log(e)} />
        <Alert variant={undefined}>This is an undefined alert</Alert>
      </Box>
      <Box>
        <Label htmlFor="file">File</Label>
        <File id="file" onChange={e => console.log(e)} />
        <Alert variant="warning">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut repudiandae eum, nisi animi
          cupiditate ad? Voluptas assumenda natus nostrum corporis quo autem ipsa maxime possimus
          quis, asperiores, earum repudiandae necessitatibus!
        </Alert>
      </Box>
      <Box>
        <Label htmlFor="toggle">Toggle</Label>
        <Toggle id="toggle" onChange={e => console.log(e)} />
        <Alert variant="danger">This is an alert</Alert>
      </Box>
    </Form>
  );
};
