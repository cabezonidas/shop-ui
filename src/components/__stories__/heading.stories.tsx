// tslint:disable: jsx-use-translation-function
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { H1 } from "../h1";
import { H2 } from "../h2";
import { H3 } from "../h3";
import { H4 } from "../h4";

storiesOf("Heading", module).add("Heading", () => (
  <>
    <H1>This is a h1</H1>
    <H2>This is a h2</H2>
    <H3>This is a h3</H3>
    <H4>This is a h4</H4>
  </>
));
