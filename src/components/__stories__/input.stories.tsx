import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Input, File } from "..";

storiesOf("Input", module)
  .add("Text", () => <Input maxWidth="300px" />)
  .add("File", () => <File maxWidth="300px" />);
