import { colors, IColors } from "./colors";

export interface ITheme {
  mode: "dark" | "light";
  colors: IColors;
  fontSizes: string[];
  space: string[];
  lineHeight: number;
  breakpoints: string[];
}

export const theme: ITheme = {
  mode: "light",
  colors,
  fontSizes: ["0.75rem", "0.875rem", "1rem", "1.25rem", "1.5rem", "2rem", "3rem", "4rem", "5rem"],
  space: [
    "0rem",
    "0.25rem",
    "0.5rem",
    "0.75rem",
    "1rem",
    "1.5rem",
    "2rem",
    "2.5rem",
    "3rem",
    "3.5rem",
    "4rem",
    "6rem",
    "8rem",
    "16rem",
  ],
  lineHeight: 1.5,
  breakpoints: ["40em", "52em", "64em", "76em"],
};
