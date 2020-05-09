import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Toggle, Label } from "..";
import { Box } from "../box";
import { useTheme } from "../../theme";

storiesOf("Toggles", module).add("Variants", () => <MyStory />);

const MyStory = () => {
  const { mode } = useTheme();
  const variants = [
    "default",
    "primary",
    "secondary",
    "info",
    "warning",
    "danger",
    "success",
  ] as any;
  return (
    <Box display="grid" gridTemplateColumns={`repeat(auto-fit, minmax(150px, 1fr))`} gridGap="2">
      {variants.map(variant => (
        <Box key={variant}>
          <Label htmlFor={variant}>{variant}</Label>
          <Toggle id={variant} variant={variant} defaultChecked={true} />
        </Box>
      ))}
    </Box>
  );
};
