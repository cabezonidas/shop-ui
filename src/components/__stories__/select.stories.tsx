// tslint:disable: jsx-use-translation-function
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Select, Option } from "..";

storiesOf("Select", module).add("Select", () => (
  <Select maxWidth="300px" onChange={e => console.log(e)}>
    <Option value="123">123</Option>
    <Option value="456">456</Option>
  </Select>
));
