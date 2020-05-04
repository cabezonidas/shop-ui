import * as React from "react";
import { theme } from "../theme";
import { Box } from "../..";
import { IColorTheme } from "../colors";
import { storiesOf } from "@storybook/react";
import contrast from "../../helpers/contrast";

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
                  color={contrast(hex) === "dark" ? "#000000" : "#ffffff"}
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
