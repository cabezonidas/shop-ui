// tslint:disable: jsx-use-translation-function
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Box } from "..";
import { useBreakpoint } from "../..";

storiesOf("Breakpoints", module).add("Window size", () => <MyStory />);

const MyStory = () => {
  const { screenWidth, screenHeight } = useBreakpoint();
  return (
    <>
      <Box>Width: {screenWidth}</Box>
      <Box>Height: {screenHeight}</Box>
    </>
  );
};
