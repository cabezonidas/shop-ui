import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Button } from "../button";
import { Box } from "../box";
import { useTheme } from "../../theme";

storiesOf("Buttons", module).add("Variants", () => <MyStory />);

const MyStory = () => {
  const { mode } = useTheme();
  const variants = ["default", "primary", "secondary", "info", "warning", "danger"] as any;
  return (
    <Box display="grid" gridTemplateColumns={`repeat(auto-fit, minmax(150px, 1fr))`} gridGap="2">
      {variants.map(variant => (
        <Button key={variant} {...{ variant }}>
          {`${variant} (${mode})`}
        </Button>
      ))}
    </Box>
  );
};
