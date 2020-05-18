import { Alert as ReachAlert } from "@reach/alert";
import { Box } from ".";
import { IColorTheme } from "../theme/colors";
import styled from "../theme/styled";

type AlertVariant = "primary" | "info" | "warning" | "danger" | "default";

export const Alert = styled(Box.withComponent(ReachAlert))<{ variant?: AlertVariant }>(
  ({ theme, variant = "danger" }) => {
    const { colors, mode } = theme;

    const colorGrade = colors[variant === "default" ? "neutral" : variant] as IColorTheme;

    return {
      textOverflow: "ellipsis",
      appearance: "none",
      display: "inline-block",
      verticalAlign: "middle",
      WebkitFontSmoothing: "subpixel-antialiased",
      transition: `border-color 0.25s ease-in-out, box-shadow 0.1s ease-in-out background-color 0.25s ease-in-out, color 0.25s ease-in-out;`,
      padding: `${theme.space[2]} ${theme.space[4]}`,
      backgroundColor: `${colorGrade.lightest}${mode === "dark" ? 80 : 20}`,
      color: mode === "light" ? colorGrade.darkest : colors.neutral.lightest,
      outlineColor: colorGrade.medium,
      borderRadius: theme.space[0],
      width: "100%",
      marginTop: theme.space[1],
    };
  }
);

Alert.displayName = "Alert";

export default Alert;
