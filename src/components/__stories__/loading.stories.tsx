import * as React from "react";
import { storiesOf } from "@storybook/react";
// tslint:disable: jsx-use-translation-function
import { DropArea } from "..";
import Button from "../button";
import { Loading } from "../loading";

storiesOf("Loading", module).add("Buttons", () => (
  <>
    <Button variant="primary">
      <Loading />
    </Button>
    <Button ml="2" variant="warning">
      <Loading />
    </Button>
    <Button ml="2" variant="secondary">
      <Loading />
    </Button>
    <Button ml="2" variant="danger">
      Test
    </Button>
  </>
));
