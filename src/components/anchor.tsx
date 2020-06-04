import Box, { BoxProps } from "./box";
import styled from "../theme/styled";

export const Anchor = styled(Box.withComponent("a"))<BoxProps>(({ theme: { colors } }) => ({
  color: "inherit",
  outlineColor: colors.neutral.medium,
  textDecoration: "none",
  "&:hover": {
    textDecoration: "none",
  },
  "&:visited": {
    textDecoration: "none",
  },
}));

Anchor.displayName = "Anchor";
Anchor.defaultProps = {
  tabIndex: 0,
};

export default Anchor;

export const NavLink = styled(Anchor)(({ theme: { colors, mode, space } }) => ({
  whiteSpace: "nowrap",
  padding: space[4],
  width: "100%",
  display: "block",
  minWidth: "200px",
  "&:hover": {
    background: mode === "dark" ? colors.neutral.darkest : colors.secondary.dark,
  },
}));
NavLink.displayName = "NavLink";

export const HeaderLink = styled(Anchor)(({ theme: { colors, space } }) => ({
  whiteSpace: "nowrap",
  heigth: "100%",
  padding: space[3],
  "&:hover": {
    background: colors.primary.darkest,
  },
}));
HeaderLink.displayName = "HeaderLink";

export const FooterLink = styled(Anchor)(({ theme: { colors, space } }) => ({
  whiteSpace: "nowrap",
  heigth: "100%",
  padding: space[3],
  textAlign: "center",
  "&:hover": {
    background: colors.primary.darkest,
  },
}));
FooterLink.displayName = "FooterLink";
