import Box from "./box";
import styled from "../theme/styled";
import contrast from "../helpers/contrast";
import { IColorTheme } from "../theme/colors";
import invertColorTheme from "../helpers/invertColorTheme";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "default"
  | "success"
  | "info"
  | "warning"
  | "danger"
  | "transparent";

export const Button = styled(Box.withComponent("button"))<{ variant?: ButtonVariant }>(
  ({ theme, variant = "default" }) => {
    const { colors, mode } = theme;

    const shared = {
      textOverflow: "ellipsis",
      appearance: "none",
      cursor: "pointer",
      display: "inline-block",
      verticalAlign: "middle",
      overflow: "hidden",
      whiteSpace: "nowrap",
      WebkitFontSmoothing: "subpixel-antialiased",
      userSelect: "none",
      WebkitTouchCallout: "none",
      transition: `border-color 0.25s ease-in-out, box-shadow 0.1s ease-in-out background-color 0.25s ease-in-out, color 0.25s ease-in-out;`,
    };

    const textColor = (bg: string) =>
      contrast(bg) === "light" ? colors.neutral.lightest : colors.neutral.darkest;

    const shadowColor = mode === "dark" ? colors.neutral.dark : colors.neutral.darkest;

    if (variant === "transparent") {
      const color = mode === "light" ? colors.neutral.darkest : colors.neutral.lightest;
      return {
        ...shared,
        display: "flex",
        flexWrap: "wrap",
        color,
        p: 0,
        outlineColor: colors.neutral.medium,
        "&:focus": {
          zIndex: 1,
        },
        "&:disabled": {
          color: "light" ? colors.neutral.dark : colors.neutral.light,
          outlineColor: colors.neutral.medium,
          cursor: "not-allowed",
        },
      } as any;
    } else {
      const colorGrade =
        variant !== "default" ? (colors[variant] as IColorTheme) : invertColorTheme(colors.neutral);

      return {
        ...shared,
        padding: `${theme.space[2]} ${theme.space[4]}`,
        backgroundColor: variant !== "default" ? colorGrade.mediumDark : colorGrade.darkest,
        color:
          variant !== "default" ? textColor(colorGrade.mediumDark) : textColor(colorGrade.darkest),
        outlineColor: colorGrade.medium,
        borderRadius: theme.space[0],
        "&:hover": {
          backgroundColor: colorGrade.dark,
          color: textColor(colorGrade.dark),
          outlineColor: colorGrade.medium,
        },
        "&:focus": {
          backgroundColor: colorGrade.mediumDark,
          color: textColor(colorGrade.mediumDark),
          outlineColor: colorGrade.medium,
          zIndex: 1,
        },
        "&:active": {
          backgroundColor: colorGrade.mediumDark,
          color: textColor(colorGrade.mediumDark),
          outlineColor: colorGrade.medium,
        },
        "&:disabled": {
          backgroundColor: colorGrade.lightest,
          color: textColor(colorGrade.lightest),
          outlineColor: colorGrade.medium,
          cursor: "not-allowed",
        },
        boxShadow: `0 1px 2px ${shadowColor}88, 0 1px 1px ${shadowColor}74`,
      };
    }
  }
);

Button.displayName = "Button";

Button.defaultProps = {
  type: "button",
};

export default Button;
