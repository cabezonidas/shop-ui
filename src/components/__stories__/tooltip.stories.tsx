// tslint:disable: jsx-use-translation-function
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Button } from "..";
import { Box } from "../box";
import { useTheme } from "../../theme";
import Tooltip from "../tooltip";

storiesOf("Tooltip", module).add("Tooltip", () => <MyStory />);

const MyStory = () => {
  const { mode } = useTheme();
  return (
    <Box
      display="grid"
      gridGap="12"
      m="4"
      width="max-content"
      gridTemplateColumns={"repeat(3, auto)"}
    >
      <Tooltip content={<>Tooltip</>} arrow={true}>
        <Button variant="primary">Tooltip 1</Button>
      </Tooltip>
      <Tooltip content={<>Tooltip</>}>
        <Button variant="info">Tooltip 2</Button>
      </Tooltip>
      <Tooltip content={<>Tooltip</>}>
        <Button variant="danger">Tooltip 3</Button>
      </Tooltip>
      <Tooltip content={<>Tooltip</>} placement="right">
        <Button variant="primary">Tooltip 4</Button>
      </Tooltip>
      <Tooltip content={<>Tooltip</>} placement="top">
        <Button variant="info">Tooltip 5</Button>
      </Tooltip>
      <Tooltip content={<>Tooltip</>} placement="left">
        <Button variant="danger">Tooltip 6</Button>
      </Tooltip>
      <Tooltip content={<>Tooltip</>}>
        <Button variant="primary">Tooltip 7</Button>
      </Tooltip>
      <Tooltip content={<>Tooltip</>}>
        <Button variant="info">Tooltip 8</Button>
      </Tooltip>
      <Tooltip content={<>Tooltip</>}>
        <Button variant="danger">Tooltip 9</Button>
      </Tooltip>
    </Box>
  );
};
