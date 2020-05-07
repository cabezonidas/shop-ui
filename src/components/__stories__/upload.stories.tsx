import * as React from "react";
import { storiesOf } from "@storybook/react";
import { DropArea } from "..";

storiesOf("Drop Area", module).add("Default", () => (
  <DropArea onFilesAdded={e => console.log(e)} />
));
