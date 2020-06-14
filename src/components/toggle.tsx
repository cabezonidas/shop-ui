import Input from "./input";
import styled from "../theme/styled";

type ToggleVariant =
  | "primary"
  | "secondary"
  | "default"
  | "info"
  | "warning"
  | "danger"
  | "dark-mode";

const svg = (fill: string, emoji?: "dark" | "light") =>
  `url("data:image/svg+xml,${encodeURI(
    `<svg xmlns="http://www.w3.org/2000/svg" height="24"  width="24" viewBox="0 0 24 24" ${`fill="${fill}"`}><circle cx="12" cy="12" r="10"/>${
      emoji
        ? `<text style="height: 200px" text-anchor="middle" x="14.5" y="9" dy=".55em">${
            emoji === "dark" ? "🌙" : "🌞"
          }</text>`
        : ""
    }</svg>`
  ).replace(/#/g, "%23")}")`;

export const Toggle = styled(Input)<{ variant?: ToggleVariant }>(
  ({ variant = "default", theme: { colors, space } }) => {
    return {
      backgroundRepeat: "no-repeat",
      backgroundPosition: `left`,
      backgroundImage: svg(
        variant === "dark-mode" ? colors.neutral.light : colors.neutral.medium,
        variant === "dark-mode" ? "light" : undefined
      ),
      backgroundColor: "transparent",
      padding: 0,
      width: space[9],
      borderRadius: space[4],
      cursor: "pointer",
      transition: "all 0.2s ease",
      display: "flex",
      "&:checked": {
        backgroundImage: svg(
          variant === "secondary"
            ? colors.neutral.mediumDark
            : variant === "dark-mode"
            ? colors.neutral.dark
            : colors.neutral.lightest,
          variant === "dark-mode" ? "dark" : undefined
        ),
        backgroundColor:
          colors[["default", "dark-mode"].includes(variant) ? "neutral" : variant].medium,
        backgroundPosition: `right`,
      },
    };
  }
);

Toggle.displayName = "Toggle";

Toggle.defaultProps = {
  type: "checkbox",
};

export default Toggle;
