import Input from "./input";
import styled from "../theme/styled";
import { BoxProps } from "./box";

// @ts-ignore
export const Select = styled(Input)<BoxProps>(({ theme: { colors: { neutral }, space } }) => ({
  backgroundImage: `url("data:image/svg+xml,${encodeURI(
    `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 8 16" fill="${neutral.mediumDark}" stroke="${neutral.mediumDark}"><path d="M4 0L0 7H8L4 0Z" /> <path d="M4 16L8 9H0L4 16Z" /></svg>`
  ).replace(/#/g, "%23")}")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: `right ${space[2]} center`,
  backgroundSize: `${space[3]} ${space[3]}`,
})).withComponent("select");

Select.displayName = "Select";

export default Select;
