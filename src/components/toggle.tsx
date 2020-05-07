import Input from "./input";
import styled from "../theme/styled";

const svg = (fill: string) =>
  `url("data:image/svg+xml,${encodeURI(
    `<svg xmlns="http://www.w3.org/2000/svg" height="24"  width="24" viewBox="0 0 24 24" ${`fill="${fill}"`}><circle cx="12" cy="12" r="10"/></svg>`
  ).replace(/#/g, "%23")}")`;

export const Toggle = styled(Input)(({ theme: { colors: { neutral, primary }, space } }) => ({
  backgroundRepeat: "no-repeat",
  backgroundPosition: `left`,
  backgroundImage: svg(neutral.medium),
  backgroundColor: "transparent",
  padding: 0,
  width: space[9],
  borderRadius: space[4],
  cursor: "pointer",
  transition: "all 0.2s ease",
  "&:checked": {
    backgroundImage: svg(neutral.lightest),
    backgroundColor: primary.medium,
    backgroundPosition: `right`,
  },
}));

Toggle.displayName = "Toggle";

Toggle.defaultProps = {
  type: "checkbox",
};

export default Toggle;
