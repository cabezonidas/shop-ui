import * as React from "react";
import { storiesOf } from "@storybook/react";
import { InputSelect } from "..";
import Box from "../box";

const options1 = [
  {
    id: "123",
    value: "prueba",
  },
  {
    id: "456",
    value: "test",
    children: (
      <Box p="4" bg="hotpint" onClick={() => alert(456)}>
        Don't click me
      </Box>
    ),
  },
];

const options2 = ["this is a test", "here there are many options"];

storiesOf("Input select", module)
  .add("Complex children", () => (
    <Box width="100px">
      <InputSelect options={options1} />
    </Box>
  ))
  .add("Simple children", () => <InputSelect options={options2} />);
