import * as React from "react";
import { theme } from "../theme";
import { Box } from "../..";
import { IColorTheme } from "../colors";
import { storiesOf } from "@storybook/react";
import { background } from "styled-system";

storiesOf("Palette", module).add("Colors", () => <Colors />);

const Colors = () => {
  const { colors } = theme;
  return (
    <Box>
      {Object.keys(colors).map(k => {
        const color = colors[k] as IColorTheme;
        return (
          <Box key={k} display="flex" pb="2">
            <Box
              display="flex"
              height="100%"
              verticalAlign="center"
              width={100}
              pt="2"
              style={{ textTransform: "capitalize" }}
            >
              {k}
            </Box>
            {Object.keys(color).map(grade => {
              const hex = color[grade];
              return (
                <Box
                  key={grade}
                  height={50}
                  bg={hex}
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                  borderRadius="2"
                  p="2"
                  width={100}
                  color={contrast(hex)}
                >
                  <Box>{grade}</Box>
                  <Box>{hex}</Box>
                </Box>
              );
            })}
          </Box>
        );
      })}
    </Box>
  );
};

function contrast(hex: string) {
  if (hex.indexOf("#") === 0) {
    hex = hex.slice(1);
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6) {
    throw new Error("Invalid HEX color.");
  }
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? "#000000" : "#FFFFFF";
}
