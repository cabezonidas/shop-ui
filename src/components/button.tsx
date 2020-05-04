import Box from "./box";
import styled from "../theme/styled";
import contrast from "../helpers/contrast";
import { IColorTheme } from "../theme/colors";
import invertColorTheme from "../helpers/invertColorTheme";

type ButtonVariant = "primary" | "secondary" | "default" | "info" | "warning" | "danger";

export const Button = styled(Box.withComponent("button"))<{ variant?: ButtonVariant }>(
  ({ theme, variant = "default" }) => {
    const { colors } = theme;

    const colorGrade =
      variant !== "default" ? (colors[variant] as IColorTheme) : invertColorTheme(colors.neutral);

    const textColor = (bg: string) =>
      contrast(bg) === "light" ? colors.neutral.lightest : colors.neutral.darkest;

    const shadowColor = mode === "dark" ? colors.neutral.dark : colors.neutral.darkest;

    return {
      backgroundColor: colorGrade.mediumDark,
      color: textColor(colorGrade.mediumDark),
      outlineColor: colorGrade.medium,
      borderRadius: theme.space[0],
      "&:hover": {
        backgroundColor: colorGrade.dark,
        color: textColor(colorGrade.dark),
        outlineColor: colorGrade.medium,
      },
      "&:focus": {
        backgroundColor: colorGrade.light,
        color: textColor(colorGrade.light),
        outlineColor: colorGrade.medium,
        zIndex: 1,
      },
      "&:active": {
        backgroundColor: colorGrade.mediumDark,
        color: textColor(colorGrade.mediumDark),
        outlineColor: colorGrade.dark,
      },
      "&:disabled": {
        backgroundColor: colorGrade.lightest,
        color: textColor(colorGrade.lightest),
        outlineColor: colorGrade.medium,
        cursor: "not-allowed",
      },
      appearance: "none",
      cursor: "pointer",
      display: "inline-block",
      verticalAlign: "middle",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      WebkitFontSmoothing: "subpixel-antialiased",
      userSelect: "none",
      WebkitTouchCallout: "none",
      transition: `border-color 0.25s ease-in-out, box-shadow 0.1s ease-in-out background-color 0.25s ease-in-out, color 0.25s ease-in-out;`,
    };
  }
);

Button.defaultProps = {
  py: 2,
  px: 4,
  type: "button",
};

export default Button;
