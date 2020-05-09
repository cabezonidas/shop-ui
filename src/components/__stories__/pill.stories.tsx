import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Pill } from "../pill";
import { Box } from "../box";
import { useTheme } from "../../theme";

storiesOf("Pills", module).add("Variants", () => <MyStory />);

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
    <>
      <Box>
        <Box>Tags</Box>
        <Box display="grid" gridTemplateColumns={`repeat(auto-fit, 5rem)`} gridGap="2">
          {variants.map(variant => (
            <Pill key={variant} {...{ variant }}>
              {`${variant} (${mode})`}
            </Pill>
          ))}
        </Box>
      </Box>
      <Box pt="4">
        <Box>Closable</Box>
        <Box display="grid" gridTemplateColumns={`repeat(auto-fit, 9rem)`} gridGap="2">
          {variants.map(variant => (
            <Pill key={variant} {...{ variant }} onClose={() => alert(`closing ${variant}`)}>
              {`${variant} (${mode})`}
            </Pill>
          ))}
        </Box>
      </Box>
    </>
  );
};
