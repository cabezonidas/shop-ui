import * as React from "react";
import { storiesOf } from "@storybook/react";
import { DropArea } from "..";

storiesOf("Upload", module).add("Drop Area", () => <DropArea onFilesAdded={e => console.log(e)} />);
