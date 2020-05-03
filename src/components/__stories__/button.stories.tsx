import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Button, PrimaryButton } from "../button";
import { Box } from "../box";
import { useTheme } from "../../theme";

storiesOf("Buttons", module)
  .add("Default", () => (
    <Button bg="green" width="250px">
      <Box bg="green">{String("Test")}</Box>
    </Button>
  ))
  .add("Primary", () => (
    <PrimaryButton width="250px">
      <Box bg="green">{String("Test")}</Box>
    </PrimaryButton>
  ))
  .add("Mode", () => (
    <PrimaryButton width="250px">
      <MyStory />
    </PrimaryButton>
  ));

const MyStory = () => {
  const { mode } = useTheme();
  return <div>My current mode is: {mode}</div>;
};
