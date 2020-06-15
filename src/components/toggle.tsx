import * as React from "react";
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

const svg = (fill: string) =>
  `url("data:image/svg+xml,${encodeURI(
    `<svg xmlns="http://www.w3.org/2000/svg" height="24"  width="24" viewBox="0 0 24 24" ${`fill="${fill}"`}><circle cx="12" cy="12" r="10"/></svg>`
  ).replace(/#/g, "%23")}")`;

export const Toggle = styled(Input)<{ variant?: ToggleVariant }>(
  ({ variant = "default", theme: { colors, space } }) => {
    return {
      backgroundRepeat: "no-repeat",
      backgroundPosition: `left`,
      backgroundImage: variant === "dark-mode" ? undefined : svg(colors.neutral.medium),
      backgroundColor: "transparent",
      padding: 0,
      width: space[9],
      borderRadius: space[4],
      cursor: "pointer",
      transition: "all 0.2s ease",
      "&:checked": {
        backgroundImage:
          variant === "dark-mode"
            ? undefined
            : svg(variant === "secondary" ? colors.neutral.mediumDark : colors.neutral.lightest),
        backgroundColor:
          colors[["default", "dark-mode"].includes(variant) ? "neutral" : variant].medium,
        backgroundPosition: `right`,
        "&:before":
          variant !== "dark-mode"
            ? undefined
            : {
                content: `"\\01f31b"`,
                left: "100%",
                marginLeft: "-1em",
              },
      },
      "&:before":
        variant !== "dark-mode"
          ? undefined
          : {
              content: `"\\01f31e"`,
              position: "absolute",
              left: 2,
              top: -2,
              fontSize: 24,
              transition: "0.2s",
            },
    };
  }
);

Toggle.displayName = "Toggle";

Toggle.defaultProps = {
  type: "checkbox",
};

export default Toggle;
